import * as React from 'react'
import * as typings from './external-variable-editor.type'
import * as classNames from 'classnames'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { Tooltip } from '../../../../../web-common/tooltip/index'
import { autoBindMethod } from '../../../../../common/auto-bind/index'
import { Button } from '../../../../../web-common/button/index'
import { Modal } from '../../../../../web-common/modal/index'
import { Tabs, TabPanel } from '../../../../../web-common/tabs/index'

import Action from './action'
import Store from './store'

import './external-variable-editor.scss'

@EditorManager.observer(['ViewportStore', 'ExternalVariableEditorAction', 'ExternalVariableEditorStore', 'ExternalVariableStore'])
export default class ExternalVariableEditor extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorTool'
    static Action = Action
    static Store = Store

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

    @autoBindMethod handleSelectExternalParameter(externalParameter: FitGaea.ExternalParameter) {
        this.props.ExternalVariableEditorAction.setCurrentEditComponentVariableByField(this.props.editInfo.field, {
            variableType: 'externalParameter',
            valueType: externalParameter.type,
            variableField: externalParameter.name
        })
    }

    render() {
        const variable = this.props.ExternalVariableEditorStore.variables.get(this.props.ViewportStore.currentEditComponentMapUniqueKey + '_' + this.props.editInfo.field)

        if (variable === undefined) {
            return null
        }

        // 外部传参
        const ExternalParameters = this.props.ExternalVariableStore.externalParameter.map((externalParameter, index) => {
            return (
                <div key={index}
                    className="global-params-item-container">
                    <div className="global-params-item-container__title">
                        {externalParameter.name}
                    </div>
                    <div className="global-params-item-container__right-container">
                        <div className="global-params-item-container__right-container__type">
                            {externalParameter.type}
                        </div>
                        <div className="global-params-item-container__right-container__select-container">
                            <Button active={variable && variable.variableField === externalParameter.name}
                                onClick={this.handleSelectExternalParameter.bind(this, externalParameter)}>选择</Button>
                        </div>
                    </div>
                </div>
            )
        })

        let magicButtonContent: React.ReactElement<any>
        if (variable !== null) {
            let icon = ''
            switch (variable.variableType) {
                case 'externalParameter':
                    icon = 'fa fa-globe'
                    break
            }

            magicButtonContent = (
                <span><i className={icon} /> {variable.variableField}</span>
            )
        }

        return (
            <div className="_namespace">
                <Button onClick={this.handleShowModal}>
                    {variable === null
                        ? <span><i className="fa fa-magic" /> 选择变量</span>
                        : magicButtonContent}
                </Button>

                <Modal className="_namespace modal"
                    show={this.state.show}
                    title="选择变量"
                    size="small"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <Tabs defaultActiveKey="externalParameter">
                        <TabPanel tab="全局传参变量"
                            activeKey="externalParameter">
                            {ExternalParameters}
                        </TabPanel>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}