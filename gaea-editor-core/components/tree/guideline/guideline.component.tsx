import * as React from 'react'
import * as typings from './guideline.type'
import * as classNames from 'classnames'

import * as EditorManager from '../../../../gaea-editor-manager/gaea-editor-manager'
import {autoBindMethod} from '../../../../../../common/auto-bind/index'

import './guideline.scss'

@EditorManager.observer(['viewport', 'treeStore'])
export default class Guideline extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        if (this.props.viewport.currentHoverComponentMapUniqueKey === null || this.props.treeStore.currentHoverTreeDom === undefined) {
            return null
        }

        // 正在拖拽中不显示
        if (this.props.viewport.currentDragComponentInfo !== null) {
            return null
        }

        const hoverBoundingClientRect = this.props.treeStore.currentHoverTreeDom.getBoundingClientRect()
        const rootBoundingClientRect = this.props.treeStore.treeRootDom.getBoundingClientRect()

        const style = {
            width: hoverBoundingClientRect.width - 4,
            height: hoverBoundingClientRect.height - 4,
            left: hoverBoundingClientRect.left - rootBoundingClientRect.left,
            top: hoverBoundingClientRect.top - rootBoundingClientRect.top + this.props.treeStore.treeRootDom.scrollTop
        }

        return (
            <div className="_namespace"
                 style={style}/>
        )
    }
}