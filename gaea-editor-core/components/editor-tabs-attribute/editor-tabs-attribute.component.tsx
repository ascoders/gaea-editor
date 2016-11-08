import * as React from 'react'
import * as typings from './editor-tabs-attribute.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import './editor-tabs-attribute.scss'

@EditorManager.observer(['applicationAction', 'viewport', 'viewportAction'])
export default class EditorTabsAttribute extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttribute'

    render() {
        // 当前不在编辑元素，不显示
        if (this.props.viewport.currentEditComponentMapUniqueKey === null) {
            return null
        }

        return (
            <div>
                {this.props.viewport.currentEditComponent.props.gaeaName}
            </div>
        )
    }
}