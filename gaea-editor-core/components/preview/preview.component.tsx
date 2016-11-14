import * as React from 'react'
import * as typings from './preview.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import {autoBindMethod} from '../../../../../common/auto-bind/index'

import './preview.scss'

@EditorManager.observer(['application'])
export default class Preview extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarRight'

    @EditorManager.lazyInject(EditorManager.ApplicationAction) private applicationAction: EditorManager.ApplicationAction
    @EditorManager.lazyInject(EditorManager.ViewportAction) private viewportAction: EditorManager.ViewportAction

    @autoBindMethod handlePreview() {
        if (!this.props.application.inPreview) {
            // 设置为预览状态，清空当前状态
            this.viewportAction.clean()
        }
        this.applicationAction.setPreview(!this.props.application.inPreview)
    }

    render() {
        return (
            <div onClick={this.handlePreview}>
                {this.props.application.inPreview ? '取消预览' : '预览'}
            </div>
        )
    }
}