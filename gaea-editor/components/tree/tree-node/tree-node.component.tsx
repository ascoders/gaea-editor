import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './tree-node.type'
import * as classNames from 'classnames'

import * as EditorManager from '../../../../gaea-editor-manager/gaea-editor-manager'
import { autoBindMethod } from '../../../../../../common/auto-bind/index'

import { TreeNode } from '../../../../../../web-common/tree/index'

import './tree-node.scss'

@EditorManager.observer(['EventStore', 'ViewportStore', 'ViewportAction', 'EventAction', 'TreeAction'])
export default class TreeNodeComponent extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static ObserveTreeElement = EditorManager.reactInject('EventStore', 'ViewportStore', 'ViewportAction', 'EventAction', 'TreeAction')(EditorManager.observer(TreeNodeComponent))

    // 当前绑定节点信息
    private componentInfo: FitGaea.ViewportComponentInfo = null

    componentWillMount() {
        // 从 store 找到自己信息
        this.componentInfo = this.props.ViewportStore.components.get(this.props.mapUniqueKey)
    }

    componentDidMount() {
        this.props.TreeAction.addTreeDom(this.props.mapUniqueKey, ReactDOM.findDOMNode(this) as HTMLElement)

        this.props.EventAction.on(`${this.props.EventStore.viewportDomUpdate}.${this.props.mapUniqueKey}`, this.updateDom)

        // 如果自己是布局元素, 给子元素绑定 sortable
        if (this.componentInfo.props.canDragIn) {
            // 添加可排序拖拽
            this.props.ViewportAction.registerInnerDrag(this.props.mapUniqueKey, ReactDOM.findDOMNode(this).querySelector('.children') as HTMLElement, 'gaea-tree-can-drag-in')
        }
    }

    componentWillUnmount() {
        // 在 dom 列表中移除
        this.props.ViewportAction.removeDomInstance(this.props.mapUniqueKey)

        this.props.EventAction.off(`${this.props.EventStore.viewportDomUpdate}.${this.props.mapUniqueKey}`, this.updateDom)
    }

    /**
     * 更新此元素的 dom 信息
     */
    @autoBindMethod updateDom() {
        this.props.TreeAction.addTreeDom(this.props.mapUniqueKey, ReactDOM.findDOMNode(this) as HTMLElement)
    }

    @autoBindMethod handleRenderTitle() {
        // 如果有事件，显示出标识
        let eventTag: React.ReactElement<any>
        if (this.componentInfo.props.gaeaEventData && this.componentInfo.props.gaeaEventData.length > 0 || (this.componentInfo.props.gaeaNativeEventData && this.componentInfo.props.gaeaNativeEventData.length)) {
            eventTag = (
                <i className="event-container fa fa-bolt" />
            )
        }

        return (
            <div className="item-container">
                <div className="icon-container">
                    <i className={`fa fa-${this.componentInfo.props.gaeaIcon}`} />
                </div>
                <div className="title">
                    {this.componentInfo.props.gaeaName}
                    {eventTag}
                </div>
            </div>
        )
    }

    @autoBindMethod handleMouseOver(event: MouseEvent) {
        event.stopPropagation()
        this.props.ViewportAction.setCurrentHoverComponentMapUniqueKey(this.props.mapUniqueKey)
    }

    @autoBindMethod handleClick(event: MouseEvent) {
        event.stopPropagation()
        this.props.ViewportAction.setCurrentEditComponentMapUniqueKey(this.props.mapUniqueKey)
    }

    render() {
        // 渲染后的结果
        let resultElement: React.ReactElement<any>
        // 子元素
        let childs: Array<React.ReactElement<any>> = null

        if (this.componentInfo.props.canDragIn && this.componentInfo.layoutChilds) {
            childs = this.componentInfo.layoutChilds.map(layoutChildUniqueMapKey => {
                return (
                    <TreeNodeComponent.ObserveTreeElement key={layoutChildUniqueMapKey}
                        mapUniqueKey={layoutChildUniqueMapKey}
                        ref={`tree-${layoutChildUniqueMapKey}`} />
                )
            })
        }

        let childProps = {
            render: this.handleRenderTitle,
            defaultExpendAll: true,
            toggleByArrow: true,
            onMouseOver: this.handleMouseOver,
            onClick: this.handleClick,
            className: classNames({
                '_namespace': true
            })
        }

        // 执行 render 以绑定数据
        this.handleRenderTitle()

        resultElement = React.createElement(TreeNode, childProps, childs)

        return resultElement
    }
}