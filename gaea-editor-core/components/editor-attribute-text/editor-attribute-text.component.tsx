import * as React from 'react'
import * as typings from './editor-attribute-text.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import {Input} from '../../../../../web-common/input/index'
import {autoBindMethod} from '../../../../../common/auto-bind/index'

import './editor-attribute-text.scss'

@EditorManager.observer(['viewport'])
export default class EditorAttributeText extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributeText'

    @EditorManager.lazyInject(EditorManager.ViewportAction) private viewportAction: EditorManager.ViewportAction

    @autoBindMethod handleChange(value: string) {
        this.viewportAction.setComponentProps(this.props.viewport.currentEditComponentMapUniqueKey, this.props.editInfo.field, value)
    }

    render() {
        return (
            <div className="_namespace">
                <div className="label">
                    {this.props.editInfo.label}
                </div>
                <div className="input-container">
                    <Input label=""
                           disabled={this.props.editInfo.editable === false}
                           onChange={this.handleChange}
                           value={this.viewportAction.getCurrentEditPropValueByEditInfo(this.props.editInfo)}/>
                </div>
            </div>
        )
    }
}