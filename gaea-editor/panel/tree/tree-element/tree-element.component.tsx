import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './tree-element.type'
import {observer, inject} from 'mobx-react'
import * as classNames from 'classnames'

import {TreeNode} from '../../../../../../web-common/tree/index'
import {autoBindMethod} from '../../../../../../common/auto-bind/index'

import './tree-element.scss'

@inject('viewport', 'application') @observer
export default class TreeElement extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 装饰器给外部用挺方便,这个专门给自己用 ^_^
    static ObserveTreeElement = inject('application', 'viewport')(observer(TreeElement))

    // 对应 store 中的数据
    private componentInfo: FitGaea.ViewportComponentInfo

    // 元素对象
    private childInstance: React.ReactInstance
    // 元素dom对象
    private childDomInstance: Element

    componentWillMount() {
        // 从 store 找到自己信息
        this.componentInfo = this.props.viewport.components.get(this.props.mapUniqueKey)
    }

    componentDidMount() {
        this.childDomInstance = ReactDOM.findDOMNode(this.childInstance)
    }

    /**
     * 返回当前 dom 对象
     */
    public getDomInstance() {
        return this.childDomInstance
    }

    /**
     * 渲染 treeNode 的 title
     */
    @autoBindMethod treeNameRender() {
        // 如果有事件，显示出标识
        let eventTag: React.ReactElement<any>
        if (this.componentInfo.props.gaeaEventData.length > 0) {
            eventTag = (
                <i className="event-container fa fa-bolt"/>
            )
        }

        // 如果 uniqueKey 中有 gaea, 说明是内置组件, 用背景加深方式展现
        if (this.componentInfo.props.gaeaUniqueKey.indexOf('gaea') > -1) {
            return (
                <div className="flex">
                    <i className={`fa fa-${this.componentInfo.props.gaeaIcon} icons gaea`}/>
                    <span className="text">{this.componentInfo.props.gaeaName}</span>
                    {eventTag}
                </div>
            )
        } else {
            return (
                <div className="flex">
                    <i className={`fa fa-${this.componentInfo.props.gaeaIcon} icons`}/>
                    <span className="text">{this.componentInfo.props.gaeaName}</span>
                    {eventTag}
                </div>
            )
        }
    }

    /**
     * 鼠标移上去
     */
    @autoBindMethod handleMouseOver(event: React.MouseEvent) {
        event.stopPropagation()
        this.props.application.event.emit(this.props.application.event.viewportOrTreeComponentMouseOver, {
            mapUniqueKey: this.props.mapUniqueKey,
            type: 'tree'
        } as FitGaea.MouseHoverComponentEvent)
        this.props.viewport.setHoveringComponentMapUniqueKey(this.props.mapUniqueKey)
    }

    /**
     * 最外层 鼠标移开
     */
    @autoBindMethod handleMouseLeave(event: React.MouseEvent) {
        event.stopPropagation()
        this.props.application.event.emit(this.props.application.event.viewportOrTreeRootComponentMouseLeave, {
            mapUniqueKey: this.props.mapUniqueKey,
            type: 'tree'
        } as FitGaea.MouseHoverComponentEvent)
        this.props.viewport.setHoveringComponentMapUniqueKey(null)
    }

    /**
     * 让树视图高亮框移动到自己身上
     */
    @autoBindMethod outerMoveBoxToSelf() {
        this.props.viewport.setHoverTreeComponent(this.childDomInstance)
    }

    /**
     * 点击树后触发
     */
    @autoBindMethod handleClick() {
        event.stopPropagation()

        // 设置选中组件的 uniqueKey
        this.props.viewport.setCurrentEditComponentMapUniqueKey(this.props.mapUniqueKey)

        // 把上一个组件触发非选中
        if (this.props.viewport.lastSelectMapUniqueKey !== null) {
            // 如果上个选中组件没被关
            this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
                mapUniqueKey: this.props.viewport.lastSelectMapUniqueKey,
                selected: false
            } as FitGaea.ComponentSelectStatusEvent)
        }

        // 设置自己为上一个组件
        this.props.viewport.setLastSelectMapUniqueKey(this.props.mapUniqueKey)

        // 触发选中组件 event, 各 layout 会接收, 设置子组件的 setSelect
        this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
            mapUniqueKey: this.props.mapUniqueKey,
            selected: true
        } as FitGaea.ComponentSelectStatusEvent)
    }

    /**
     * 修改自己选中状态
     */
    @autoBindMethod setSelect(selected: boolean) {
        this.setState({
            selected
        })
    }

    render() {
        // 渲染后的结果
        let resultElement: React.ReactElement<any>
        // 子元素
        let childs: Array<React.ReactElement<any>> = null

        // gaea-layout 可以有子元素
        if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.layoutChilds) {
            childs = this.componentInfo.layoutChilds.map(layoutChildUniqueMapKey=> {
                return (
                    <TreeElement.ObserveTreeElement key={layoutChildUniqueMapKey}
                                                    mapUniqueKey={layoutChildUniqueMapKey}
                                                    ref={`tree-${layoutChildUniqueMapKey}`}/>
                )
            })
        }

        let childProps = {
            render: this.treeNameRender,
            defaultExpendAll: true,
            toggleByArrow: true,
            onMouseOver: this.handleMouseOver,
            onClick: this.handleClick,
            ref: (ref: React.ReactInstance)=> {
                this.childInstance = ref
            },
            className: classNames({
                '_namespace': true,
                'selected': this.state.selected
            }),
            // 父级是布局组件才有
            onMouseLeave: this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' ? this.handleMouseLeave : null,
            // 主动绑定用到的数据
            name: this.componentInfo.props.name,
            icon: this.componentInfo.props.icon
        }

        resultElement = React.createElement(TreeNode, childProps, childs)

        return resultElement
    }
}