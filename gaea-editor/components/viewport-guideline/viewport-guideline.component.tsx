import * as React from 'react'
import * as typings from './viewport-guideline.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import {autoBindMethod} from '../../../../../common/auto-bind/index'

import './viewport-guideline.scss'

@EditorManager.observer(['viewport', 'event'])
export default class TabTools extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'viewport'

    @EditorManager.lazyInject(EditorManager.ViewportAction) private viewportAction: EditorManager.ViewportAction
    @EditorManager.lazyInject(EditorManager.EventAction) private eventAction: EditorManager.EventAction

    componentDidMount() {
        this.eventAction.on(this.props.event.viewportUpdated, this.handleViewportUpdated)
    }

    componentWillUnmount() {
        this.eventAction.off(this.props.event.viewportUpdated, this.handleViewportUpdated)
    }

    /**
     * 视图区域更新时触发
     */
    @autoBindMethod handleViewportUpdated() {
        this.forceUpdate()
    }

    render() {
        // 没有 hover 元素不显示
        if (this.props.viewport.currentHoverComponentMapUniqueKey === null || this.props.viewport.currentHoverComponentDom === undefined) {
            return null
        }

        // 正在拖拽中不显示
        if (this.props.viewport.currentDragComponentInfo !== null) {
            return null
        }

        const targetBoundingClientRect = this.props.viewport.currentHoverComponentDom.getBoundingClientRect()
        const viewportBoundingClientRect = this.props.viewport.viewportDom.getBoundingClientRect()

        const style = {
            width: targetBoundingClientRect.width - 4,
            height: targetBoundingClientRect.height - 4,
            top: targetBoundingClientRect.top - viewportBoundingClientRect.top,
            left: targetBoundingClientRect.left - viewportBoundingClientRect.left
        }

        return (
            <div className="_namespace"
                 style={style}/>
        )
    }
}