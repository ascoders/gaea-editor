import * as React from 'react'
import * as typings from './editor-attribute-background.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import Color from '../../utils/color/color.component'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './editor-attribute-background.scss'

@EditorManager.observer(['ViewportStore', 'ViewportAction'])
export default class EditorAttributeBackground extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributeBackground'

    @autoBindMethod handleBackgroundColorChange(color: any) {
        this.props.ViewportAction.updateCurrentEditComponentProps('style.backgroundColor', `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)
    }

    render() {
        if (this.props.ViewportStore.currentEditComponentMapUniqueKey===null){
            return null
        }

        return (
            <div className="_namespace">
                <div className="label">
                    背景颜色
                </div>
                <div className="input-container">
                    <Color color={this.props.ViewportStore.currentEditComponentInfo.props.style.backgroundColor || 'transparent'}
                        onChange={this.handleBackgroundColorChange} />
                </div>
            </div>
        )
    }
}