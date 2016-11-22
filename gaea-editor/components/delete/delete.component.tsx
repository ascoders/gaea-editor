import * as React from 'react'
import * as typings from './delete.type'
import * as keymaster from 'keymaster'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { autoBindMethod } from '../../../../../common/auto-bind/index'
import notice from '../../../../../web-common/message/index'

import './delete.scss'

@EditorManager.observer(['ApplicationStore', 'ViewportStore', 'ViewportAction'])
export default class Delete extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarRight'

    componentWillMount() {
        keymaster('delete, backspace', this.removeComponent)
    }

    componentWillUnmount() {
        keymaster.unbind('delete, backspace')
    }

    @autoBindMethod removeComponent() {
        if (this.props.ApplicationStore.inPreview || !this.props.ViewportStore.currentHoverComponentMapUniqueKey) {
            return
        }

        // 不能删除根节点
        if (this.props.ViewportStore.currentHoverComponentMapUniqueKey === this.props.ViewportStore.rootMapUniqueKey) {
            return
        }

        this.props.ViewportAction.removeComponent(this.props.ViewportStore.currentHoverComponentMapUniqueKey)
    }

    render() {
        return null as any
    }
}