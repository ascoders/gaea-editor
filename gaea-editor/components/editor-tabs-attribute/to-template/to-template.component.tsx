import * as React from 'react'
import * as typings from './to-template.type'

import * as EditorManager from '../../../../gaea-editor-manager/gaea-editor-manager'

import {autoBindMethod} from '../../../../../../common/auto-bind/index'
import {Modal} from '../../../../../../web-common/modal/index'
import {Button} from '../../../../../../web-common/button/index'
import {Input} from '../../../../../../web-common/input/index'

import TabToolsComponentsComboAction from '../../tab-tools-components-combo/action'

import './to-template.scss'

@EditorManager.observer(['application', 'viewport'])
export default class ToTemplate extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarRight'

    @EditorManager.lazyInject(EditorManager.ViewportAction) private viewportAction: EditorManager.ViewportAction
    @EditorManager.lazyInject(EditorManager.ApplicationAction) private applicationAction: EditorManager.ApplicationAction
    @EditorManager.lazyInject(TabToolsComponentsComboAction) private tabToolsComponentsComboAction: TabToolsComponentsComboAction

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
        let componentFullInfo = this.viewportAction.getComponentFullInfoByMapUniqueKey(this.props.viewport.currentEditComponentMapUniqueKey)

        // 瘦身
        componentFullInfo.componentInfo = this.applicationAction.cleanComponent(componentFullInfo.componentInfo)
        Object.keys(componentFullInfo.childs).forEach(childKey=> {
            componentFullInfo.childs[childKey] = this.applicationAction.cleanComponent(componentFullInfo.childs[childKey])
        })

        this.tabToolsComponentsComboAction.addCombo(this.state.templateName, componentFullInfo)
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