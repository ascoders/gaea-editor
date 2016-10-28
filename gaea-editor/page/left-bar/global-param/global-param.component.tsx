import * as React from 'react'
import * as typings from './global-param.type'
import {observer, inject} from 'mobx-react'

import Modal from '../../../../../../web-common/modal/index'
import Button from '../../../../../../web-common/button/index'
import Input from '../../../../../../web-common/input/index'
import Message from '../../../../../../web-common/message/index'
import {Select, Option} from '../../../../../../web-common/select/index'
import {autoBindMethod} from '../../../../../../common/auto-bind/index'

import './global-param.scss'

@inject('setting', 'viewport', 'application') @observer
export default class GlobalParam extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    @autoBindMethod handleShowModal() {
        this.setState({
            show: true
        })
    }

    @autoBindMethod handleOk() {
        if (this.state.name === '') {
            return Message.error('变量名不能为空')
        }

        this.setState({
            show: false
        }, ()=> {
            this.props.setting.addGlobalParam({
                name: this.state.name,
                type: this.state.type
            })

            this.setState({
                name: '',
                type: 'number'
            })
        })
    }

    @autoBindMethod handleCancel() {
        this.setState({
            show: false
        })
    }

    @autoBindMethod handleChangeName(name: string) {
        this.setState({
            name
        })
    }

    @autoBindMethod handleChangeType(type: string) {
        this.setState({
            type
        })
    }

    @autoBindMethod handleDelete(index: number) {
        this.props.setting.removeGlobalParam(index)
    }

    render() {
        const items = this.props.setting.data.globalParams.map((param, index)=> {
            return (
                <div className="global-param"
                     key={index}>
                    <div className="global-param__name-container">
                        <div className="global-param__name-container__name">{param.name}</div>
                        <div className="global-param__name-container__type">{param.type}</div>
                    </div>
                    <div className="global-param__delete"
                         onClick={this.handleDelete.bind(this,index)}>
                        <i className="fa fa-close"/>
                    </div>
                </div>
            )
        })

        return (
            <div className="_namespace">
                {items}

                <Button className="add-param"
                        onClick={this.handleShowModal}>新增传参变量名</Button>

                <Modal className="_namespace"
                       title="新增传参变量名"
                       show={this.state.show}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <Input label="变量名"
                           onChange={this.handleChangeName}
                           value={this.state.name}/>
                    <Select label="类型"
                            onChange={this.handleChangeType}
                            value={this.state.type}>
                        <Option value="number">Number</Option>
                        <Option value="string">String</Option>
                        <Option value="boolean">Boolean</Option>
                    </Select>
                </Modal>
            </div>
        )
    }
}