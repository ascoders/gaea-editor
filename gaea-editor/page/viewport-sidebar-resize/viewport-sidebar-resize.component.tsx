import * as React from 'react'
import * as typings from './viewport-sidebar-resize.type'
import {observer, inject} from 'mobx-react'
import * as _ from 'lodash'
import './viewport-sidebar-resize.scss'

@inject('application') @observer
export default class ViewportSidebarResize extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    componentDidMount() {
        // 监听鼠标移动
        document.addEventListener('mousemove', this.handleMouseMove.bind(this))
        // 监听鼠标松开
        document.addEventListener('mouseup', this.handleMouseUp.bind(this))
    }

    componentWillUnmount() {
        // 取消监听
        document.removeEventListener('mousemove', this.handleMouseMove.bind(this))
        document.removeEventListener('mouseup', this.handleMouseUp.bind(this))
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return !_.isEqual(this.state, nextState)
    }

    /**
     * 鼠标移动时的回调
     */
    handleMouseMove(event: MouseEvent) {
        if (!this.props.application.isSidebarMoving)return
        this.props.application.setSidebarWidth(this.props.application.sidebarWidth - event.movementX)
    }

    /**
     * 鼠标点下
     */
    handleMouseDown() {
        this.props.application.setSidebarMoving(true)
    }

    /**
     * 鼠标松开（全局）
     */
    handleMouseUp() {
        this.props.application.setSidebarMoving(false)
    }

    render() {
        return (
            <div className="_namespace"
                 onMouseDown={this.handleMouseDown.bind(this)}></div>
        )
    }
}