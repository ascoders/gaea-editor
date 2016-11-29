import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as $ from 'jquery'
import * as typings from './guideline.type'
import * as classNames from 'classnames'

import * as EditorManager from '../../../../gaea-editor-manager/gaea-editor-manager'
import { autoBindMethod } from 'nt-auto-bind'

import './guideline.scss'

@EditorManager.observer(['ViewportStore', 'TreeStore'])
export default class Guideline extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    componentWillReact() {
        if (this.props.ViewportStore.currentHoverComponentMapUniqueKey === null || this.props.TreeStore.currentHoverTreeDom === undefined) {
            return
        }

        // 正在拖拽中不显示
        if (this.props.ViewportStore.currentDragComponentInfo !== null) {
            return
        }

        // 让 dom 树外层滚动到这个元素上
        const $nodeDom = $(ReactDOM.findDOMNode(this.props.TreeStore.currentHoverTreeDom))
        const $containerDom = $(this.props.TreeStore.treeRootDom)

        // 如果超过一定范围，就移动
        if ($nodeDom.offset().top - $containerDom.offset().top < 20 || $nodeDom.offset().top - $containerDom.offset().top > $containerDom.height() - 50) {
            $containerDom.stop().animate({
                scrollTop: $nodeDom.offset().top - $containerDom.offset().top + $containerDom.scrollTop() - 50
            }, 50)
        }
    }

    render() {
        if (this.props.ViewportStore.currentHoverComponentMapUniqueKey === null || this.props.TreeStore.currentHoverTreeDom === undefined) {
            return null
        }

        // 正在拖拽中不显示
        if (this.props.ViewportStore.currentDragComponentInfo !== null) {
            return null
        }

        const hoverBoundingClientRect = this.props.TreeStore.currentHoverTreeDom.getBoundingClientRect()
        const rootBoundingClientRect = this.props.TreeStore.treeRootDom.getBoundingClientRect()

        const style = {
            width: hoverBoundingClientRect.width - 4,
            height: hoverBoundingClientRect.height - 4,
            left: hoverBoundingClientRect.left - rootBoundingClientRect.left,
            top: hoverBoundingClientRect.top - rootBoundingClientRect.top + this.props.TreeStore.treeRootDom.scrollTop
        }

        return (
            <div className="_namespace"
                style={style} />
        )
    }
}