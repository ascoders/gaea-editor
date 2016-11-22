import * as React from 'react'
import * as typings from './save.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './save.scss'

@EditorManager.observer(['ApplicationStore', 'ViewportAction', 'GlobalSettingAction'])
export default class Save extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarRight'

    @autoBindMethod handleClick() {
        // 获取增量编辑信息
        const componentsInfo = this.props.ViewportAction.getIncrementComponentsInfo()
        this.props.application.editorProps.onSave(componentsInfo, this.props.ViewportAction.getZipSettingData())
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                保存
            </div>
        )
    }
}