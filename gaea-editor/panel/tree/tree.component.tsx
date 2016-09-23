import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './tree.type'
import {observer, inject} from 'mobx-react'
import * as $ from 'jquery'

import {Tree as TreeComponent} from '../../../../../web-common/tree/index'
import {autoBindMethod} from '../../../../../common/auto-bind/index'

import TreeElement from './tree-element/tree-element.component'
import TreeMoveBox from './tree-move-box/tree-move-box.component'

import './tree.scss'

@inject('application', 'viewport') @observer
export default class Tree extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 元素对象
    private childInstance: React.ReactInstance
    // 元素dom对象
    private childDomInstance: Element

    componentDidMount() {
        this.childDomInstance = ReactDOM.findDOMNode(this.childInstance)
        this.props.viewport.setTreeDomInstance(this.childDomInstance)
        this.addListener()
    }

    componentWillUnmount() {
        this.props.application.event.off(this.props.application.event.viewportOrTreeComponentMouseOver, this.handleViewportOrTreeComponentMouseOver)
        this.props.application.event.off(this.props.application.event.viewportOrTreeRootComponentMouseLeave, this.handleViewportOrTreeRootComponentMouseLeave)
        this.props.application.event.off(this.props.application.event.changeComponentSelectStatusEvent, this.handleChangeComponentSelectStatus)
    }

    @autoBindMethod addListener() {
        this.props.application.event.on(this.props.application.event.viewportOrTreeComponentMouseOver, this.handleViewportOrTreeComponentMouseOver)
        this.props.application.event.on(this.props.application.event.viewportOrTreeRootComponentMouseLeave, this.handleViewportOrTreeRootComponentMouseLeave)
        this.props.application.event.on(this.props.application.event.changeComponentSelectStatusEvent, this.handleChangeComponentSelectStatus)
    }

    /**
     * 当视图或者树区域有组件 hover
     */
    @autoBindMethod handleViewportOrTreeComponentMouseOver(listnerContext: any, opts: FitGaea.MouseHoverComponentEvent) {
        const targetInstance = this.findEditHelperByMapUniqueKey(opts.mapUniqueKey)
        targetInstance.outerMoveBoxToSelf()
        if (opts.type !== 'tree' && this.props.viewport.lastSelectMapUniqueKey === null) {
            // 只有非 tree 上组件触发的 hover, 并且没有选中组件 才会滑动 tree 视图
            // 让 domTree 滚动条滑动到 tree 这个元素实例的位置
            this.scrollToChildren(targetInstance)
        }
    }

    /**
     * 滑动到某个子元素上
     */
    @autoBindMethod scrollToChildren(child: TreeElement) {
        const $domTree = $(ReactDOM.findDOMNode(this))
        const $treeInstance = $(child.getDomInstance())
        $domTree.stop().animate({
            scrollTop: $treeInstance.offset().top - $domTree.offset().top + $domTree.scrollTop() - 50
        }, 100)
    }

    /**
     * 根据 mapUniqueKey 找到对应子元素
     */
    @autoBindMethod findEditHelperByMapUniqueKey(mapUniqueKey: string) {
        const finderPath = this.props.viewport.findComponentPathFromRoot(mapUniqueKey)
        let targetInstance = (this.refs[`tree-${this.props.viewport.rootMapUniqueKey}`] as any)['wrappedInstance'] as TreeElement
        finderPath.forEach(path=> {
            targetInstance = (targetInstance.refs[`tree-${path}`]as any)['wrappedInstance'] as TreeElement
        })
        return targetInstance
    }

    /**
     * 当视图或者树区域有组件取消 hover
     */
    @autoBindMethod handleViewportOrTreeRootComponentMouseLeave() {
        // 隐藏树视图高亮框
        this.props.viewport.setTreeLeaveHover()
    }

    /**
     * 更改某个子组件的选中状态
     */
    @autoBindMethod handleChangeComponentSelectStatus(listnerContext: any, opts: FitGaea.ComponentSelectStatusEvent) {
        const targetInstance = this.findEditHelperByMapUniqueKey(opts.mapUniqueKey)
        targetInstance.setSelect(opts.selected)
        this.scrollToChildren(targetInstance)
    }

    /**
     * 设置本元素对象 ref
     * @param ref
     */
    @autoBindMethod setChildRef(ref: React.ReactInstance) {
        this.childInstance = ref
    }

    render() {
        return (
            <div className="_namespace">
                <div className="component-count">
                    实例数:{this.props.viewport.components.size}
                </div>

                <div ref={this.setChildRef}>
                    <TreeComponent defaultExpendAll={true}
                                   toggleByArrow={true}>
                        <TreeElement mapUniqueKey={this.props.viewport.rootMapUniqueKey}
                                     ref={`tree-${this.props.viewport.rootMapUniqueKey}`}/>
                    </TreeComponent>
                </div>

                <TreeMoveBox/>
            </div>
        )
    }
}