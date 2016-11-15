import * as React from 'react'
import * as typings from './delete.type'
import * as keymaster from 'keymaster'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import {autoBindMethod} from '../../../../../common/auto-bind/index'
import notice from '../../../../../web-common/message/index'

import './delete.scss'

@EditorManager.observer(['application', 'viewport', 'copyPasteStore'])
export default class Delete extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarRight'

    @EditorManager.lazyInject(EditorManager.ViewportAction) private viewportAction: EditorManager.ViewportAction

    componentWillMount() {
        keymaster('delete, backspace', this.removeComponent)
    }

    componentWillUnmount() {
        keymaster.unbind('delete, backspace')
    }

    @autoBindMethod removeComponent() {
        if (this.props.application.inPreview || !this.props.viewport.currentHoverComponentMapUniqueKey) {
            return
        }

        // 不能删除根节点
        if (this.props.viewport.currentHoverComponentMapUniqueKey === this.props.viewport.rootMapUniqueKey) {
            return
        }

        this.viewportAction.removeComponent(this.props.viewport.currentHoverComponentMapUniqueKey)
    }

    render() {
        return null as any
    }
}