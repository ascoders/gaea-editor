import * as React from 'react'
import * as typings from './to-template.type'

import * as EditorManager from '../../../../gaea-editor-manager/gaea-editor-manager'

import {autoBindMethod} from 'nt-auto-bind'
import {Modal} from 'nt-web-modal'
import {Button} from 'nt-web-button'
import {Input} from 'nt-web-input'

import './to-template.scss'

@EditorManager.observer(['ApplicationStore', 'ViewportStore','ViewportAction','ApplicationAction','TabToolsComponentsComboAction'])
export default class ToTemplate extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarRight'

    @autoBindMethod handleShowModal() {
        this.setState({
            show: true
        })
    }

    @autoBindMethod handleOk() {
        this.setState({
            show: false
        })

        // 设置为模板
        let componentFullInfo = this.props.ViewportAction.getComponentFullInfoByMapUniqueKey(this.props.ViewportStore.currentEditComponentMapUniqueKey)

        // 瘦身
        componentFullInfo.componentInfo = this.props.ApplicationAction.cleanComponent(componentFullInfo.componentInfo)
        Object.keys(componentFullInfo.childs).forEach(childKey=> {
            componentFullInfo.childs[childKey] = this.props.ApplicationAction.cleanComponent(componentFullInfo.childs[childKey])
        })

        this.props.TabToolsComponentsComboAction.addCombo(this.state.templateName, componentFullInfo)
    }

    @autoBindMethod handleCancel() {
        this.setState({
            show: false
        })
    }

    @autoBindMethod handleChangeTemplateName(value: string) {
        this.setState({
            templateName: value
        })
    }

    render() {
        return (
            <Button className="child-scale"
                    onClick={this.handleShowModal}>
                <i className="fa fa-puzzle-piece"/>

                <Modal title="设为模板"
                       show={this.state.show}
                       onOk={this.handleOk.bind(this)}
                       onCancel={this.handleCancel.bind(this)}>
                    <Input value={this.state.templateName}
                           label="模板名称"
                           onChange={this.handleChangeTemplateName}/>
                </Modal>
            </Button>
        )
    }
}