import * as React from 'react'
import * as typings from './viewport-guideline.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './viewport-guideline.scss'

@EditorManager.observer(['ViewportStore', 'EventStore', 'ViewportAction', 'EventAction'])
export default class TabTools extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'viewport'

    componentDidMount() {
        this.props.EventAction.on(this.props.EventStore.viewportUpdated, this.handleViewportUpdated)
    }

    componentWillUnmount() {
        this.props.EventAction.off(this.props.EventStore.viewportUpdated, this.handleViewportUpdated)
    }

    /**
     * 视图区域更新时触发
     */
    @autoBindMethod handleViewportUpdated() {
        this.forceUpdate()
    }

    render() {
        // 没有 hover 元素不显示
        if (this.props.ViewportStore.currentHoverComponentMapUniqueKey === null || this.props.ViewportStore.currentHoverComponentDom === undefined) {
            return null
        }

        // 正在拖拽中不显示
        if (this.props.ViewportStore.currentDragComponentInfo !== null) {
            return null
        }

        const targetBoundingClientRect = this.props.ViewportStore.currentHoverComponentDom.getBoundingClientRect()
        const viewportBoundingClientRect = this.props.ViewportStore.viewportDom.getBoundingClientRect()

        const style = {
            width: targetBoundingClientRect.width - 4,
            height: targetBoundingClientRect.height - 4,
            top: targetBoundingClientRect.top - viewportBoundingClientRect.top,
            left: targetBoundingClientRect.left - viewportBoundingClientRect.left
        }

        return (
            <div className="_namespace"
                style={style} />
        )
    }
}