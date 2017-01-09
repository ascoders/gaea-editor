import * as React from 'react'
import * as typings from './external-variable.type'
import * as classNames from 'classnames'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { Tooltip } from 'nt-web-tooltip'
import Modal from 'nt-web-modal'
import Button from 'nt-web-button'
import Input from 'nt-web-input'
import Message from 'nt-web-message'
import { Select, Option } from 'nt-web-select'
import { autoBindMethod } from 'nt-auto-bind'

import Action from './action'
import Store from './store'

import './external-variable.scss'

@EditorManager.observer(['ExternalVariableAction', 'ExternalVariableStore', 'ViewportStore', 'ApplicationStore'])
export default class ExternalVariable extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'leftBarExternalVariable'
    static Action = Action
    static Store = Store


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
        }, () => {
            this.props.ExternalVariableAction.addExternalParameter({
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
        this.props.ExternalVariableAction.removeExternalParameter(index)
    }

    render() {
        const items = this.props.ExternalVariableStore.externalParameter.map((param, index) => {
            return (
                <div className="global-param"
                    key={index}>
                    <div className="global-param__name-container">
                        <div className="global-param__name-container__name">{param.name}</div>
                        <div className="global-param__name-container__type">{param.type}</div>
                    </div>
                    <div className="global-param__delete"
                        onClick={this.handleDelete.bind(this, index)}>
                        <i className="fa fa-close" />
                    </div>
                </div>
            )
        })


        return (
            <div className="_namespace">
                <div className="title">
                    外部传参
                </div>
                <div className="container">
                    {items}

                    <Button className="add-param"
                        onClick={this.handleShowModal}>新增外部参数</Button>

                    <Modal className="_namespace"
                        title="新增外部参数"
                        show={this.state.show}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}>
                        <Input label="变量名"
                            onChange={this.handleChangeName}
                            value={this.state.name} />
                        <Select label="类型"
                            onChange={this.handleChangeType}
                            value={this.state.type}>
                            <Option value="number">Number</Option>
                            <Option value="string">String</Option>
                            <Option value="boolean">Boolean</Option>
                        </Select>
                    </Modal>

                </div>
            </div>
        )
    }
}