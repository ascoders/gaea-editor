import * as React from 'react'
import * as typings from './background.type'
import {observer, inject} from 'mobx-react'
import * as _ from 'lodash'

import {ChromePicker} from 'react-color'
import {Input} from '../../../../../../../../web-common/input/index'
import {RenderTo} from '../../../../../../../../web-common/render-to/index'

import './background.scss'

@inject('viewport') @observer
export default class EditComponentBackground extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)
        this.init(this.props)
    }

    componentWillReceiveProps(nextProps: typings.PropsDefine) {
        this.init(nextProps)
    }

    init(props: typings.PropsDefine) {

    }

    handleColorPickerClick() {
        this.setState({
            displayColorPicker: !this.state.displayColorPicker
        })
    }

    handleClose() {
        this.setState({
            displayColorPicker: false
        })
    }

    handleColorChange(color: any) {
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.updateComponentValueWithNoHistory(['style', 'backgroundColor'], `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)
    }

    handleColorChangeComplete(color: any) {
        this.props.viewport.updateComponentValueWithNoHistory(['style', 'backgroundColor'], `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)
        this.props.viewport.writeHistory()
    }

    render() {
        const shadow = {
            position: 'absolute',
            left: -1000,
            top: -1000,
            width: 10000,
            height: 10000,
            zIndex: 99
        }

        return (
            <div className="_namespace">
                <div className="row-container">
                    <i className="fa fa-eyedropper icon-content"/>

                    <div className="color-picker-container">
                        <div className="color-picker-label-container"
                             onClick={ this.handleColorPickerClick.bind(this) }>
                            <div className="color-picker-label"
                                 style={{backgroundColor:this.componentInfo.props.style.backgroundColor}}/>
                        </div>
                        { this.state.displayColorPicker &&
                        <div>
                            <div style={shadow}
                                 onClick={this.handleClose.bind(this)}/>
                            <div className="picker-container">
                                <ChromePicker label="hex"
                                              onChange={this.handleColorChange.bind(this)}
                                              onChangeComplete={this.handleColorChangeComplete.bind(this)}
                                              color={this.componentInfo.props.style.backgroundColor || 'transparent'}/>
                            </div>
                        </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}