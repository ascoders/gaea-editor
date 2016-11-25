import * as React from 'react'
import * as typings from './editor-attribute-number.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import { Number } from '../../../../../web-common/number/index'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './editor-attribute-number.scss'

// 根据 inputRange outputRange 转换值
const parseInputToOutRange = (value: number, inputRange: Array<number>, outputRange: Array<number>) => {
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

@EditorManager.observer(['ViewportStore', 'ViewportAction'])
export default class EditorAttributeNumber extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributeNumber'

    @autoBindMethod handleChangeValue(value: string, unit: string) {
        let outputValue = parseFloat(value)

        // 如果有输入输出转换，进行变换
        if (this.props.editInfo.number && this.props.editInfo.number.inputRange && this.props.editInfo.number.outputRange) {
            outputValue = parseInputToOutRange(outputValue, this.props.editInfo.number.inputRange, this.props.editInfo.number.outputRange)
        }

        // 如果有后缀，加上后缀
        if (unit) {
            this.props.ViewportAction.updateCurrentEditComponentProps(this.props.editInfo.field, outputValue.toString() + unit)
        } else {
            this.props.ViewportAction.updateCurrentEditComponentProps(this.props.editInfo.field, outputValue)
        }
    }

    @autoBindMethod handleChange(event: any) {
        this.handleChangeValue(event.target.value, this.state.unit)
    }

    render() {
        if (this.props.ViewportStore.currentEditComponentMapUniqueKey === null) {
            return null
        }

        let inputValue = this.props.ViewportAction.getCurrentEditPropValueByEditInfo(this.props.editInfo)

        // 如果不为空，进行输入转换
        if (inputValue !== '' && this.props.editInfo.number && this.props.editInfo.number.outputRange) {
            inputValue = parseInputToOutRange(parseFloat(inputValue), this.props.editInfo.number.outputRange, this.props.editInfo.number.inputRange).toString()
        }

        const textOpts = {
            label: '',
            disabled: this.props.editInfo.editable === false,
            value: inputValue,
            onChange: (value: string, unit: string) => {
                this.handleChangeValue(value, unit)
                this.setState({
                    unit
                })
            }
        }

        // 输入框元素
        let InputElement: React.ReactElement<any> = null

        if (this.props.editInfo.number && this.props.editInfo.number.slider) {
            InputElement = (
                <div className="range-container">
                    <input className="range"
                        max={this.props.editInfo.number.max}
                        min={this.props.editInfo.number.min}
                        step={this.props.editInfo.number.step}
                        value={inputValue}
                        disabled={this.props.editInfo.editable === false}
                        onChange={this.handleChange.bind(this)}
                        type="range" />
                    <Number {...this.props.editInfo.number} {...textOpts} />
                </div>
            )
        } else {
            InputElement = (
                <Number {...this.props.editInfo.number} {...textOpts} />
            )
        }

        return (
            <div className="_namespace">
                <div className="label">
                    {this.props.editInfo.label}
                </div>
                <div className="input-container">
                    {InputElement}
                </div>
            </div>
        )
    }
}