import * as React from 'react'
import * as typings from './editor-attribute-text.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import { Input } from '../../../../../web-common/input/index'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './editor-attribute-text.scss'

@EditorManager.observer(['ViewportStore', 'ViewportAction', 'ApplicationAction'])
export default class EditorAttributeText extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributeText'

    @autoBindMethod handleChange(value: string) {
        this.props.ViewportAction.updateComponentProps(this.props.ViewportStore.currentEditComponentMapUniqueKey, this.props.editInfo.field, value)
    }

    render() {
        if (this.props.ViewportStore.currentEditComponentMapUniqueKey === null) {
            return null
        }

        return (
            <div className="_namespace">
                <div className="label">
                    {this.props.editInfo.label}
                    {this.props.ApplicationAction.loadingPluginByPosition('editorLabel', {
                        index: this.props.index,
                        editInfo: this.props.editInfo
                    })}
                </div>
                <div className="input-container">
                    {!this.props.editInfo.hideTool &&
                        <Input label=""
                            disabled={this.props.editInfo.editable === false}
                            onChange={this.handleChange}
                            value={this.props.ViewportAction.getCurrentEditPropValueByEditInfo(this.props.editInfo)} />
                    }
                    {this.props.ApplicationAction.loadingPluginByPosition('editorTool', {
                        index: this.props.index,
                        editInfo: this.props.editInfo
                    })}
                </div>
            </div>
        )
    }
}