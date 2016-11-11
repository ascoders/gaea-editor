import * as React from 'react'
import * as typings from './editor-attribute-margin-padding.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import MarginPaddingEditor from '../../../../../web-common/margin-padding-editor/index'
import {autoBindMethod} from '../../../../../common/auto-bind/index'

import './editor-attribute-margin-padding.scss'

@EditorManager.observer(['viewport', 'application'])
export default class EditorAttributeMarginPadding extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributeMarginPadding'

    @EditorManager.lazyInject(EditorManager.ViewportAction) private viewportAction: EditorManager.ViewportAction

    handleStart() {
        //this.props.viewport.prepareWriteHistory()
    }

    handleChange(name: string, value: number) {
        // 直接改值
        this.viewportAction.updateCurrentEditComponentProps(`style.${name}`, value)
    }

    handleFinalChange(name: string, value: number) {
        this.viewportAction.updateCurrentEditComponentProps(`style.${name}`, value)
        //this.props.viewport.writeHistory()
    }

    render() {
        return (
            <div className="_namespace">
                <MarginPaddingEditor size={220}
                                     onStart={this.handleStart.bind(this)}
                                     marginLeft={this.props.viewport.currentEditComponentInfo.props.style.marginLeft}
                                     marginTop={this.props.viewport.currentEditComponentInfo.props.style.marginTop}
                                     marginRight={this.props.viewport.currentEditComponentInfo.props.style.marginRight}
                                     marginBottom={this.props.viewport.currentEditComponentInfo.props.style.marginBottom}
                                     paddingLeft={this.props.viewport.currentEditComponentInfo.props.style.paddingLeft}
                                     paddingTop={this.props.viewport.currentEditComponentInfo.props.style.paddingTop}
                                     paddingRight={this.props.viewport.currentEditComponentInfo.props.style.paddingRight}
                                     paddingBottom={this.props.viewport.currentEditComponentInfo.props.style.paddingBottom}
                                     onChange={this.handleChange.bind(this)}
                                     onFinalChange={this.handleFinalChange.bind(this)}/>
            </div>
        )
    }
}