import * as React from 'react'
import * as typings from './global-setting.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import {autoBindMethod} from 'nt-auto-bind'
import {Modal} from 'nt-web-modal'
import Color from '../../utils/color/color.component'
import Radio from 'nt-web-radio'
import Input from 'nt-web-input'

import Action from './action'
import Store from './store'

import './global-setting.scss'

function getMonthMM(month: number) {
    month += 1
    return fixBefore(month)
}

/**
 * 前面补0
 */
function fixBefore(count: number) {
    if (count < 10) {
        return '0' + count.toString()
    }
    return count.toString()
}

function formatDate(date: string) {
    const dateObj = new Date(date)
    if (date === null) {
        return ''
    }

    // YYYY-mm-dd
    return dateObj.getFullYear() + '-' + getMonthMM(dateObj.getMonth()) + '-' + fixBefore(dateObj.getDate())
}

function formatTime(date: string) {
    const dateObj = new Date(date)
    if (date === null) {
        return ''
    }

    // HH:mm:ss
    return fixBefore(dateObj.getHours()) + ':' + fixBefore(dateObj.getMinutes()) + ':' + fixBefore(dateObj.getSeconds())
}

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

    @autoBindMethod handleSwitchShowTimeUnlimited() {
        this.props.GlobalSettingAction.changeShowTimeUnlimited()
    }

    @autoBindMethod handleSwitchShowTimeLimited() {
        this.props.GlobalSettingAction.changeShowTimeLimited()
    }

    @autoBindMethod handleChangeStartDate(event: any) {
        this.props.GlobalSettingAction.changeShowTime('start', 'date', event.target.value)
    }

    @autoBindMethod handleChangeStartTime(event: any) {
        this.props.GlobalSettingAction.changeShowTime('start', 'time', event.target.value)
    }

    @autoBindMethod handleChangeEndDate(event: any) {
        this.props.GlobalSettingAction.changeShowTime('end', 'date', event.target.value)
    }

    @autoBindMethod handleChangeEndTime(event: any) {
        this.props.GlobalSettingAction.changeShowTime('end', 'time', event.target.value)
    }

    @autoBindMethod handleChangeCustomSetting(key: string, value: string) {
        this.props.GlobalSettingAction.changeCustomSetting(key, value)
    }

    render() {
        // 文本编辑所有字段
        const TextSettings = Object.keys(this.props.GlobalSettingStore).map((settingKey: string, index: number) => {
            if (typeof (this.props.GlobalSettingStore as any)[settingKey] !== 'string' && (this.props.GlobalSettingStore as any)[settingKey] !== 'number') {
                return null
            }

            const value = (this.props.GlobalSettingStore as any)[settingKey] ? (this.props.GlobalSettingStore as any)[settingKey].toString() : ''

            return (
                <div className="row"
                     key={index}>
                    <div className="col">{settingKey}</div>
                    <div className="col-right">
                        <Input value={value}
                               label=""
                               style={{width:400}}
                               onChange={this.handleChangeCustomSetting.bind(this, settingKey)}/>
                    </div>
                </div>
            )
        })

        return (
            <div onClick={this.handleShowModal}>
                全局设置

                <Modal title="全局设置"
                       className="_namespace modal"
                       show={this.state.show}
                       onOk={this.handleOk}
                       size="large"
                       onCancel={this.handleCancel}>
                    <div className="row">
                        <div className="col">画布背景颜色</div>
                        <div className="col-right">
                            <Color color={this.props.GlobalSettingStore.backgroundColor || 'transparent'}
                                   onChange={this.handleBackgroundColorChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">展示时间段</div>
                        <div className="col-right">
                            <Radio checked={this.props.GlobalSettingStore.showTimeStart===null}
                                   onChange={this.handleSwitchShowTimeUnlimited}/>
                            无限制
                            <Radio checked={this.props.GlobalSettingStore.showTimeStart!==null}
                                   onChange={this.handleSwitchShowTimeLimited}
                                   style={{marginLeft:10}}/>
                            <input type="date"
                                   onChange={this.handleChangeStartDate}
                                   value={formatDate(this.props.GlobalSettingStore.showTimeStart)}/>
                            <input type="time"
                                   onChange={this.handleChangeStartTime}
                                   value={formatTime(this.props.GlobalSettingStore.showTimeStart)}/>
                            &nbsp;~&nbsp;
                            <input type="date"
                                   onChange={this.handleChangeEndDate}
                                   value={formatDate(this.props.GlobalSettingStore.showTimeEnd)}/>
                            <input type="time"
                                   onChange={this.handleChangeEndTime}
                                   value={formatTime(this.props.GlobalSettingStore.showTimeEnd)}/>
                        </div>
                    </div>
                    <div className="custom-setting">
                        自定义配置
                    </div>
                    {TextSettings}
                </Modal>
            </div>
        )
    }
}