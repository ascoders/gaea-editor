import * as React from 'react'
import * as typings from './setting.type'
import {observer, inject} from 'mobx-react'

import Modal from '../../../../../../web-common/modal/index'
import Switch from '../../../../../../web-common/switch/index'
import {autoBindMethod} from '../../../../../../common/auto-bind/index'

import './setting.scss'

@inject('setting') @observer
export default class Setting extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

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

    @autoBindMethod setConfirmWhenRemoveComponent(checked: boolean) {
        this.props.setting.setConfirmWhenRemoveComponent(checked)
    }

    @autoBindMethod setShowLayoutWhenDragging(checked: boolean) {
        this.props.setting.setShowLayoutWhenDragging(checked)
    }

    render() {
        return (
            <div className="menu-item"
                 onClick={this.handleShowModal}>
                设置
                <div className="_namespace">
                    <Modal className="_namespace"
                           show={this.state.show}
                           onOk={this.handleOk.bind(this)}
                           onCancel={this.handleCancel.bind(this)}>
                        <div className="title">设置</div>

                        <div className="left-right">
                            <div className="left">点击移除时会弹出确认框</div>
                            <div className="right">
                                <Switch checked={this.props.setting.confirmWhenRemoveComponent}
                                        onChange={this.setConfirmWhenRemoveComponent}/>
                            </div>
                        </div>

                        <div className="left-right">
                            <div className="left">拖动时显示所有布局元素</div>
                            <div className="right">
                                <Switch checked={this.props.setting.showLayoutWhenDragging}
                                        onChange={this.setShowLayoutWhenDragging}/>
                            </div>
                        </div>

                    </Modal>
                </div>
            </div>
        )
    }
}