import * as React from 'react'
import * as typings from './global-setting.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { autoBindMethod } from '../../../../../common/auto-bind/index'
import { Modal } from '../../../../../web-common/modal/index'
import Color from '../../utils/color/color.component'

import Action from './action'
import Store from './store'

import './global-setting.scss'

@EditorManager.observer(['ApplicationStore', 'GlobalSettingAction', 'GlobalSettingStore'])
export default class GlobalSetting extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarLeft'
    static Action = Action
    static Store = Store

    componentWillMount() {
        // 覆盖默认配置
        this.props.GlobalSettingAction.setDefaultSetting(this.props.ApplicationStore.editorProps.defaultSetting)

        // 设置背景颜色
        if (this.props.GlobalSettingStore.backgroundColor === 'transparent') {
            this.props.GlobalSettingAction.setBackgroundColor(this.props.GlobalSettingStore.backgroundColor, 0)
        } else {
            const match = /rgba\((.*)\)/g.exec(this.props.GlobalSettingStore.backgroundColor)
            const rgbaSplit = match[1].split(',')
            this.props.GlobalSettingAction.setBackgroundColor(this.props.GlobalSettingStore.backgroundColor, Number(rgbaSplit[3]))
        }
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
        this.props.GlobalSettingAction.setBackgroundColor(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`, color.rgb.a)
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
                            <Color color={this.props.GlobalSettingStore.backgroundColor || 'transparent'}
                                onChange={this.handleBackgroundColorChange} />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}