import * as React from 'react'
import * as typings from './remove-button.type'
import {observer, inject} from 'mobx-react'

import * as _ from 'lodash'

import Button from '../../../../../../../web-common/button/index'
import Modal from '../../../../../../../web-common/modal/index'
import {autoBindMethod} from '../../../../../../../common/auto-bind/index'

@inject('viewport', 'setting') @observer
export default class RemoveButton extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    @autoBindMethod handleShowModalOrClick() {
        if (this.props.setting.data.confirmWhenRemoveComponent) {
            this.setState({
                show: true
            })
        } else {
            this.handleOk()
        }
    }

    @autoBindMethod handleOk() {
        // 取消选中会清空最后选择的 key, 所以先保存一下
        const currentEditComponentMapUniqueKey = this.props.viewport.currentEditComponentMapUniqueKey
        this.props.viewport.deleteComponentByMapUniqueKeyWithHistory(currentEditComponentMapUniqueKey)
    }

    @autoBindMethod handleCancel() {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <Button type="secondary"
                    onClick={this.handleShowModalOrClick}>
                移除
                <Modal show={this.state.show}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <p>是否要移除此组件?</p>
                </Modal>
            </Button>
        )
    }
}