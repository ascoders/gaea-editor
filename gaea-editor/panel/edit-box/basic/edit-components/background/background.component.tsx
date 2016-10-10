import * as React from 'react'
import * as typings from './background.type'
import {observer, inject} from 'mobx-react'

import Color from '../../utils/color/color.component'

import './background.scss'

@inject('viewport') @observer
export default class EditComponentBackground extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo
    private colorChangeStatus = 'finish'

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
        if (this.colorChangeStatus === 'finish') {
            this.colorChangeStatus = 'start'
            this.props.viewport.prepareWriteHistory()
        }
        this.props.viewport.updateComponentValueWithNoHistory('style.backgroundColor', `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`)
    }

    handleColorChangeComplete(color: any) {
        this.colorChangeStatus = 'finish'
        this.props.viewport.writeHistory()
    }

    render() {
        return (
            <div className="_namespace">
                <div className="row-container">
                    <i className="fa fa-eyedropper icon-content"/>

                    <Color onChange={this.handleColorChange.bind(this)}
                           onChangeComplete={this.handleColorChangeComplete.bind(this)}
                           color={this.componentInfo.props.style.backgroundColor || 'white'}/>
                </div>
            </div>
        )
    }
}