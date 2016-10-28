import * as React from 'react'
import * as typings from './variable.type'
import {observer, inject} from 'mobx-react'
import * as _ from 'lodash'

import Button from '../../../../../../../../web-common/button/index'
import Modal from '../../../../../../../../web-common/modal/index'
import {Tabs, TabPanel} from '../../../../../../../../web-common/tabs/index'
import {autoBindMethod} from '../../../../../../../../common/auto-bind/index'

import './variable.scss'

@inject('viewport', 'application', 'setting') @observer
export default class EditComponentVariable extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)
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

    @autoBindMethod handleSelectGlobalParam(globalParam: FitGaea.GlobalParam) {
        this.props.viewport.addVariable(this.props.viewport.currentEditComponentMapUniqueKey, {
            field: this.props.editOption.field,
            variableType: 'globalParam',
            valueType: globalParam.type,
            variableField: globalParam.name
        })
    }

    render() {
        // 全局传参变量
        const globalParams = this.props.setting.data.globalParams && this.props.setting.data.globalParams.map((globalParam, index)=> {
                return (
                    <div key={index}
                         className="global-params-item-container">
                        <div className="global-params-item-container__title">
                            {globalParam.name}
                        </div>
                        <div className="global-params-item-container__right-container">
                            <div className="global-params-item-container__right-container__type">
                                {globalParam.type}
                            </div>
                            <div className="global-params-item-container__right-container__select-container">
                                <Button active={this.componentInfo.props.gaeaVariables.findIndex(variable=>variable.variableField===globalParam.name)>-1}
                                        onClick={this.handleSelectGlobalParam.bind(this, globalParam)}>选择</Button>
                            </div>
                        </div>
                    </div>
                )
            })

        let magicButtonContent: React.ReactElement<any>
        if (this.props.variable !== null) {
            let icon = ''
            switch (this.props.variable.variableType) {
                case 'globalParam':
                    icon = 'fa fa-globe'
                    break
            }

            magicButtonContent = (
                <span><i className={icon}/> {this.props.variable.variableField}</span>
            )
        }

        return (
            <div className="_namespace">
                <Button onClick={this.handleShowModal}>
                    {this.props.variable === null
                        ?<span><i className="fa fa-magic"/> 选择变量</span>
                        : magicButtonContent}
                </Button>

                <Modal className="_namespace modal"
                       show={this.state.show}
                       title="选择变量"
                       size="small"
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <Tabs defaultActiveKey="globalParam">
                        <TabPanel tab="全局传参变量"
                                  activeKey="globalParam">
                            {globalParams}
                        </TabPanel>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}