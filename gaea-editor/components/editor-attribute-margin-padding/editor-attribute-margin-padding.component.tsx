import * as React from 'react'
import * as typings from './editor-attribute-margin-padding.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import MarginPaddingEditor from 'nt-web-margin-padding-editor'
import { autoBindMethod } from 'nt-auto-bind'

import './editor-attribute-margin-padding.scss'

@EditorManager.observer(['ViewportStore', 'ApplicationStore', 'ViewportAction'])
export default class EditorAttributeMarginPadding extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributeMarginPadding'

    handleStart() {
        //this.props.viewport.prepareWriteHistory()
    }

    handleChange(name: string, value: number) {
        // 直接改值
        this.props.ViewportAction.updateCurrentEditComponentProps(`style.${name}`, value)
    }

    handleFinalChange(name: string, value: number) {
        this.props.ViewportAction.updateCurrentEditComponentProps(`style.${name}`, value)
        //this.props.viewport.writeHistory()
    }

    render() {
        if (this.props.ViewportStore.currentEditComponentMapUniqueKey === null) {
            return null
        }

        return (
            <div className="_namespace">
                <MarginPaddingEditor size={220}
                    onStart={this.handleStart.bind(this)}
                    marginLeft={this.props.ViewportStore.currentEditComponentInfo.props.style.marginLeft}
                    marginTop={this.props.ViewportStore.currentEditComponentInfo.props.style.marginTop}
                    marginRight={this.props.ViewportStore.currentEditComponentInfo.props.style.marginRight}
                    marginBottom={this.props.ViewportStore.currentEditComponentInfo.props.style.marginBottom}
                    paddingLeft={this.props.ViewportStore.currentEditComponentInfo.props.style.paddingLeft}
                    paddingTop={this.props.ViewportStore.currentEditComponentInfo.props.style.paddingTop}
                    paddingRight={this.props.ViewportStore.currentEditComponentInfo.props.style.paddingRight}
                    paddingBottom={this.props.ViewportStore.currentEditComponentInfo.props.style.paddingBottom}
                    onChange={this.handleChange.bind(this)}
                    onFinalChange={this.handleFinalChange.bind(this)} />
            </div>
        )
    }
}