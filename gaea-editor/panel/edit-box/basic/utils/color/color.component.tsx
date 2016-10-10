import * as React from 'react'
import * as typings from './color.type'
import {observer, inject} from 'mobx-react'

import {ChromePicker} from 'react-color'
import {autoBindMethod} from '../../../../../../../../common/auto-bind/index'

import './color.scss'

@inject('viewport', 'application') @observer
export default class Color extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    componentWillMount() {
        this.props.application.event.on(this.props.application.event.editorPanelShadowClose, this.handleEditorPanelShadowClose)
    }

    componentWillUnmount() {
        this.props.application.event.off(this.props.application.event.editorPanelShadowClose, this.handleEditorPanelShadowClose)
    }

    /**
     * 遮罩层被关闭
     */
    @autoBindMethod handleEditorPanelShadowClose() {
        this.handleClose()
    }

    handleColorPickerClick() {
        this.setState({
            displayColorPicker: true
        }, ()=> {
            // 显示编辑区域遮罩层
            this.props.viewport.setShowEditorPanelShadow(true)
        })
    }

    handleClose() {
        this.setState({
            displayColorPicker: false
        })
    }

    handleColorChange(color: any) {
        this.props.onChange(color)
    }

    handleColorChangeComplete(color: any) {
        this.props.onChangeComplete(color)
    }

    render() {
        return (
            <div className="_namespace">
                <div className="color-picker-label-container"
                     onClick={ this.handleColorPickerClick.bind(this) }>
                    <div className="color-picker-label"
                         style={{backgroundColor:this.props.color}}/>
                </div>
                { this.state.displayColorPicker &&
                <div className="picker-container"
                     style={this.props.absoluteStyle}>
                    <ChromePicker label="hex"
                                  onChange={this.handleColorChange.bind(this)}
                                  onChangeComplete={this.handleColorChangeComplete.bind(this)}
                                  color={this.props.color}/>
                </div>
                }

            </div>
        )
    }
}