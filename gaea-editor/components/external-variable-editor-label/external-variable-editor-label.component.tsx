import * as React from 'react'
import * as typings from './external-variable-editor-label.type'
import * as classNames from 'classnames'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { Tooltip } from '../../../../../web-common/tooltip/index'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './external-variable-editor-label.scss'

@EditorManager.observer(['ViewportStore', 'ExternalVariableEditorAction'])
export default class ExternalVariableEditorLabel extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorLabel'

    @autoBindMethod handleUseVariable() {
        this.props.ExternalVariableEditorAction.setCurrentEditComponentVariableByField(this.props.editInfo.field, null)
    }

    @autoBindMethod handleCancelVariable() {
        this.props.ExternalVariableEditorAction.removeCurrentEditComponentVariableByField(this.props.editInfo.field)
    }

    render() {
        const variables = this.props.ViewportStore.currentEditComponentInfo.props.gaeaVariables

        if (variables[this.props.editInfo.field] === undefined) {
            return (
                <Tooltip title="点击使用变量">
                    <div className="_namespace" onClick={this.handleUseVariable}>
                        <i className="fa fa-ravelry" />
                    </div>
                </Tooltip>
            )
        } else {
            return (
                <Tooltip title="点击使用常量">
                    <div className="_namespace" onClick={this.handleCancelVariable}>
                        <i className="fa fa-font" />
                    </div>
                </Tooltip>
            )
        }
    }
}