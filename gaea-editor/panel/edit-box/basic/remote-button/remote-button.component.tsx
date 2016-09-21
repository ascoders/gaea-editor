import * as React from 'react'
import * as typings from './remote-button.type'
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
        if (this.props.setting.confirmWhenRemoveComponent) {
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

        // 找到父级 mapUniqueKey, 记录历史操作使用
        const parentMapUniqueKey = this.props.viewport.components.get(currentEditComponentMapUniqueKey).parentMapUniqueKey

        // 存储组件信息
        const componentInfo = _.cloneDeep(JSON.parse(JSON.stringify(this.props.viewport.components.get(currentEditComponentMapUniqueKey))))

        // 找到是父级的第几个
        const index = this.props.viewport.components.get(parentMapUniqueKey).layoutChilds.findIndex(item=>item === currentEditComponentMapUniqueKey)

        // 取消编辑状态
        this.props.viewport.cancelEditComponent()

        // 删除
        const deleteChildsComponents = this.props.viewport.deleteComponent(currentEditComponentMapUniqueKey)

        this.props.viewport.saveOperate({
            type: 'remove',
            mapUniqueKey: currentEditComponentMapUniqueKey,
            remove: {
                mapUniqueKey: currentEditComponentMapUniqueKey,
                parentMapUniqueKey,
                // 删除的位置
                index,
                // 组件信息
                componentInfo: componentInfo,
                // 子元素列表 （包括非直接子集）
                childs: deleteChildsComponents
            }
        })
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