import * as React from 'react'
import * as typings from './number.type'
import {observer, inject} from 'mobx-react'

import Number from '../../../../../../../../web-common/number/index'

import './number.scss'

// 根据 inputRange outputRange 转换值
const parseInputToOutRange = (value: number, inputRange: Array<number>, outputRange: Array<number>)=> {
    if (value >= inputRange[0] && value <= inputRange[1]) {
        // 给的值必须在 input 范围内
        // 转换成 0~1 的小数
        const percentage = (value - inputRange[0]) / (inputRange[1] - inputRange[0])
        // 转换成 output 的长度
        const outputLength = (outputRange[1] - outputRange[0]) * percentage
        // 数值是加上最小值
        value = outputLength + outputRange[0]
    }
    return value
}

@inject('viewport') @observer
export default class EditComponentNumber extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    handleChangeValue(value: string, unit: string) {
        let outputValue = parseFloat(value)

        // 如果有输入输出转换，进行变换
        if (this.props.editOption.number.inputRange && this.props.editOption.number.outputRange) {
            outputValue = parseInputToOutRange(outputValue, this.props.editOption.number.inputRange, this.props.editOption.number.outputRange)
        }

        // 如果有后缀，加上后缀
        if (unit !== '') {
            this.props.viewport.updateComponentOptionsValue(this.props.editOption, outputValue.toString() + unit)
        } else {
            this.props.viewport.updateComponentOptionsValue(this.props.editOption, outputValue)
        }
    }

    handleChange(event: any) {
        this.handleChangeValue(event.target.value, this.state.unit)
    }

    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)

        let inputValue = this.props.viewport.getPropsByFieldWithEditor(this.componentInfo.props, this.props.editOption)
        // 如果不为空，进行输入转换
        if (inputValue !== '') {
            inputValue = parseInputToOutRange(parseFloat(inputValue), this.props.editOption.number.outputRange, this.props.editOption.number.inputRange).toString()
        }

        const disabled = !this.props.editOption.editable

        const textOpts = {
            label: '',
            disabled: disabled,
            value: inputValue,
            onChange: (value: string, unit: string)=> {
                this.handleChangeValue(value, unit)
                this.setState({
                    unit
                })
            }
        }

        if (this.props.editOption.number.slider) {
            return (
                <div className="_namespace">
                    <input className="range"
                           max={this.props.editOption.number.max}
                           min={this.props.editOption.number.min}
                           step={this.props.editOption.number.step}
                           value={inputValue}
                           disabled={disabled}
                           onChange={this.handleChange.bind(this)}
                           type="range"/>
                    <Number {...this.props.editOption.number} {...textOpts}/>
                </div>
            )
        } else {
            return (
                <Number {...this.props.editOption.number} {...textOpts}/>
            )
        }
    }
}