import * as React from 'react'
import * as typings from './copy-paste.type'
import * as keymaster from 'keymaster'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { autoBindMethod } from 'nt-auto-bind'
import notice from 'nt-web-message'

import Action from './action'
import Store from './store'

import './copy-paste.scss'

@EditorManager.observer(['ApplicationStore', 'ViewportStore', 'CopyPasteStore', 'ViewportAction', 'CopyPasteAction'])
export default class CopyPaste extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarRight'

    static Action = Action
    static Store = Store

    componentWillMount() {
        keymaster('command+c, ctrl+c', this.copy)
        keymaster('command+v, ctrl+v', this.paste)
    }

    componentWillUnmount() {
        keymaster.unbind('command+c, ctrl+c')
        keymaster.unbind('command+v, ctrl+v')
    }

    @autoBindMethod copy() {
        if (this.props.ApplicationStore.inPreview || !this.props.ViewportStore.currentHoverComponentMapUniqueKey) {
            return
        }
        this.props.CopyPasteAction.copy(this.props.ViewportStore.currentHoverComponentMapUniqueKey)
    }

    @autoBindMethod paste() {
        if (this.props.ApplicationStore.inPreview || !this.props.ViewportStore.currentHoverComponentMapUniqueKey) {
            return
        }
        if (!this.props.CopyPasteAction.paste(this.props.ViewportStore.currentHoverComponentMapUniqueKey)) {
            notice.warning('此处无法粘贴')
        }
    }

    render() {
        return null as any
    }
}