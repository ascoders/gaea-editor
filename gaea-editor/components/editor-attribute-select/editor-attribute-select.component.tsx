import * as React from 'react'
import * as typings from './editor-attribute-select.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import { Select } from '../../../../../web-common/select/index'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './editor-attribute-select.scss'

@EditorManager.observer(['ViewportStore', 'ViewportAction'])
export default class EditorAttributeSelect extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributeSelect'

    @autoBindMethod handleChange(value: string) {
        this.props.ViewportAction.updateComponentProps(this.props.ViewportStore.currentEditComponentMapUniqueKey, this.props.editInfo.field, value)
    }

    render() {
        const selectorOpts = {
            label: '',
            disabled: this.props.editInfo.editable === false,
            defaultValue: this.props.ViewportAction.getCurrentEditPropValueByEditInfo(this.props.editInfo),
            options: this.props.editInfo.selector,
            onChange: this.handleChange
        }

        return (
            <div className="_namespace">
                <div className="label">
                    {this.props.editInfo.label}
                </div>
                <div className="input-container">
                    <Select {...selectorOpts} />
                </div>
            </div>
        )
    }
}