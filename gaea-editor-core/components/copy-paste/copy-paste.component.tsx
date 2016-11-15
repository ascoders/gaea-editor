import * as React from 'react'
import * as typings from './copy-paste.type'
import * as keymaster from 'keymaster'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import {autoBindMethod} from '../../../../../common/auto-bind/index'
import notice from '../../../../../web-common/message/index'

import Action from './action'
import Store from './store'

import './copy-paste.scss'

@EditorManager.observer(['application', 'viewport', 'copyPasteStore'])
export default class CopyPaste extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarRight'

    static Action = Action
    static Store = Store

    @EditorManager.lazyInject(EditorManager.ViewportAction) private viewportAction: EditorManager.ViewportAction
    @EditorManager.lazyInject(Action) private copyPasteAction: Action

    componentWillMount() {
        keymaster('command+c, ctrl+c', this.copy)
        keymaster('command+v, ctrl+v', this.paste)
    }

    componentWillUnmount() {
        keymaster.unbind('command+c, ctrl+c')
        keymaster.unbind('command+v, ctrl+v')
    }

    @autoBindMethod copy() {
        if (this.props.application.inPreview || !this.props.viewport.currentHoverComponentMapUniqueKey) {
            return
        }
        this.copyPasteAction.copy(this.props.viewport.currentHoverComponentMapUniqueKey)
    }

    @autoBindMethod paste() {
        if (this.props.application.inPreview || !this.props.viewport.currentHoverComponentMapUniqueKey) {
            return
        }
        if (!this.copyPasteAction.paste(this.props.viewport.currentHoverComponentMapUniqueKey)) {
            notice.warning('此处无法粘贴')
        }
    }

    render() {
        return null as any
    }
}