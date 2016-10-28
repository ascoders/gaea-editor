import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './viewport.type'
import {observer, inject} from 'mobx-react'

import {ObservableMap} from 'mobx'
import * as _ from 'lodash'
import './viewport.scss'

import {autoBindMethod} from '../../../../../common/auto-bind/index'

import EditHelper from './edit-helper/edit-helper.component'

@inject('application', 'viewport') @observer
export default class Viewport extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    componentDidMount() {
        this.addListener()

        window.addEventListener('resize', this.handleAnyDomChange)

        // Listen to changes on the elements in the page that affect layout
        const mObserver = new MutationObserver(this.handleAnyDomChange.bind(this))
        mObserver.observe(ReactDOM.findDOMNode(this), {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        })
    }

    componentWillUnmount() {
        this.props.application.event.off(this.props.application.event.viewportOrTreeComponentMouseOver, this.handleViewportOrTreeComponentMouseOver)
        this.props.application.event.off(this.props.application.event.viewportOrTreeRootComponentMouseLeave, this.handleViewportOrTreeRootComponentMouseLeave)
        this.props.application.event.off(this.props.application.event.changeComponentSelectStatusEvent, this.handleChangeComponentSelectStatus)
        window.removeEventListener('resize', this.handleAnyDomChange)
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
    }

    /**
     * 根据 mapUniqueKey 找到对应子元素
     */
    @autoBindMethod findEditHelperByMapUniqueKey(mapUniqueKey: string) {
        const finderPath = this.props.viewport.findComponentPathFromRoot(mapUniqueKey)
        let targetInstance = (this.refs[`edit-${this.props.viewport.rootMapUniqueKey}`] as any)['wrappedInstance'] as EditHelper
        finderPath.forEach(path=> {
            targetInstance = (targetInstance.refs[`edit-${path}`]as any)['wrappedInstance'] as EditHelper
        })
        return targetInstance
    }

    /**
     * 当视图或者树区域有组件取消 hover
     */
    @autoBindMethod handleViewportOrTreeRootComponentMouseLeave() {
        // 隐藏树视图高亮框
        this.props.viewport.setLeaveHover()
    }

    /**
     * 更改某个子组件的选中状态
     */
    @autoBindMethod handleChangeComponentSelectStatus(listnerContext: any, opts: FitGaea.ComponentSelectStatusEvent) {
        const targetInstance = this.findEditHelperByMapUniqueKey(opts.mapUniqueKey)
        targetInstance.setSelect(opts.selected)
    }

    @autoBindMethod getRootRef(ref: React.ReactInstance) {
        this.props.viewport.setViewportDomInstance(ReactDOM.findDOMNode(ref))
    }

    @autoBindMethod handleAnyDomChange() {
        // 当 dom 有任何改变，立刻更新外边框位置
        this.props.viewport.resetComponentOutline()
    }

    @autoBindMethod handleMouseLeave(event: React.MouseEvent) {
        event.stopPropagation()
        this.props.application.event.emit(this.props.application.event.viewportOrTreeRootComponentMouseLeave, {
            mapUniqueKey: this.props.viewport.rootMapUniqueKey,
            type: 'component'
        } as FitGaea.MouseHoverComponentEvent)
        this.props.viewport.setHoveringComponentMapUniqueKey(null)
    }

    render() {
        const style = {
            display: this.props.application.isPreview && 'none'
        }

        return (
            <div className="_namespace"
                 style={style}
                 onMouseLeave={this.handleMouseLeave}
                 ref={this.getRootRef}>
                <EditHelper mapUniqueKey={this.props.viewport.rootMapUniqueKey}
                            ref={`edit-${this.props.viewport.rootMapUniqueKey}`}/>
            </div>
        )
    }
}