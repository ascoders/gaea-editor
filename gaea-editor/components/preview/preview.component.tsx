import * as React from 'react'
import * as typings from './preview.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './preview.scss'

@EditorManager.observer(['ApplicationStore', 'ApplicationAction', 'ViewportAction'])
export default class Preview extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarRight'

    @autoBindMethod handlePreview() {
        if (!this.props.ApplicationStore.inPreview) {
            // 设置为预览状态，清空当前状态
            this.props.ViewportAction.clean()
        }
        this.props.ApplicationAction.setPreview(!this.props.ApplicationStore.inPreview)
    }

    render() {
        return (
            <div onClick={this.handlePreview}>
                {this.props.ApplicationStore.inPreview ? '取消预览' : '预览'}
            </div>
        )
    }
}