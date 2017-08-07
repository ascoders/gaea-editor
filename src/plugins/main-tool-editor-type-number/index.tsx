import { Connect } from "dob-react"
import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { Input } from "../../components/input/src"
import { NumberInput } from "../../components/number-input/src"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

// 根据 inputRange outputRange 转换值
const parseInputToOutRange = (value: number | string, inputRange: number[], outputRange: number[]) => {
  if (value === undefined || value === null) {
    return null
  }

  value = Number(value)

  if (inputRange[0] === outputRange[0] && inputRange[1] === outputRange[1]) {
    return value
  }

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

@Connect
class MainToolEditorNumber extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  /**
   * 组件实例的信息
   */
  private instanceInfo: InstanceInfo

  private numberData?: IEditorNumberData

  public render() {
    if (!this.props.stores.ViewportStore.instances.has(this.props.stores.ViewportStore.currentEditInstanceKey)) {
      return null
    }

    this.instanceInfo = this.props.stores.ViewportStore.instances.get(this.props.stores.ViewportStore.currentEditInstanceKey)

    let currentValue: number = this.props.actions.ViewportAction.getInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, this.props.realField)

    this.numberData = {
      useSlider: false,
      step: 1,
      inputRange: [-9999999, 9999999], ...(this.props.editor.data || {})}

    // 如果只设置了 inputRange, 默认 outputRange 要与其相同
    if (this.numberData.inputRange && !this.numberData.outputRange) {
      this.numberData.outputRange = this.numberData.inputRange.slice()
    }

    // 当前值转换成 inputValue
    currentValue = parseInputToOutRange(currentValue, this.numberData.outputRange, this.numberData.inputRange)

    return (
      <Styled.Container>
        {currentValue !== null && this.numberData.useSlider &&
          <input
            min={this.numberData.inputRange[0]}
            max={this.numberData.inputRange[1]}
            step={this.numberData.step}
            value={currentValue || 0}
            onChange={this.handleSliderChange}
            type="range"
          />
        }

        <NumberInput
          value={currentValue}
          onChange={this.handleChange}
          min={this.numberData.inputRange[0]}
          max={this.numberData.inputRange[1]}
        />
      </Styled.Container>
    )
  }

  private handleChange = (value: number) => {
    // 转换
    value = parseInputToOutRange(value, this.numberData.inputRange, this.numberData.outputRange)

    this.props.actions.ViewportAction.setInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, this.props.realField, value)
  }

  private handleSliderChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value)
    this.handleChange(value)
  }
}

export default {
  position: "mainToolEditorTypeNumber",
  class: MainToolEditorNumber
}
