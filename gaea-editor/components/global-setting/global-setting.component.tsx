import * as React from 'react'
import * as typings from './global-setting.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import {autoBindMethod} from '../../../../../common/auto-bind/index'
import {Modal} from '../../../../../web-common/modal/index'
import Color from '../../../components/color/color.component'

import Action from './action'
import Store from './store'

import './global-setting.scss'

@EditorManager.observer(['application'])
export default class GlobalSetting extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarLeft'
    static Action = Action
    static Store = Store

    @EditorManager.lazyInject(Action) private globalSettingAction: Action

    componentWillMount() {
        // 覆盖默认配置
        this.globalSettingAction.setDefaultSetting(this.props.application.editorProps.defaultSetting)
    }

    @autoBindMethod handleShowModal() {
        this.setState({
            show: true
        })
    }

    @autoBindMethod handleOk() {
        this.setState({
            show: false
        })
    }

    @autoBindMethod handleCancel() {
        this.setState({
            show: false
        })
    }

    @autoBindMethod handleBackgroundColorChange(color: any) {
        this.globalSettingAction.setBackgroundColor(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`, color.rgb.a)
    }

    render() {
        return (
            <div onClick={this.handleShowModal}>
                全局设置

                <Modal title="全局设置"
                       className="_namespace modal"
                       show={this.state.show}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <div className="row">
                        <div className="col">画布背景颜色</div>
                        <div className="col-right">
                            <Color color={this.props.application.viewportStyle.backgroundColor || 'transparent'}
                                   onChange={this.handleBackgroundColorChange}/>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}