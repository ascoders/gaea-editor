import * as React from 'react'
import * as typings from './save.type'
import * as keymaster from 'keymaster'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './save.scss'

@EditorManager.observer(['ApplicationStore', 'ViewportAction', 'GlobalSettingAction'])
export default class Save extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarRight'

    componentWillMount() {
        keymaster('command+s, ctrl+s', this.handleClick)
    }

    componentWillUnmount() {
        keymaster.unbind('command+s, ctrl+s')
    }

    @autoBindMethod handleClick() {
        // 获取增量编辑信息
        const componentsInfo = this.props.ViewportAction.getIncrementComponentsInfo()
        this.props.ApplicationStore.editorProps.onSave(componentsInfo, this.props.GlobalSettingAction.getZipSettingData())
        return false
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                保存
            </div>
        )
    }
}