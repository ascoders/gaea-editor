import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Styled from "./number-input.style"
import { Props, State } from "./number-input.type"

// undefined null "" -> 显示 ""，回调值为 null
// NaN               -> 显示 0, 回调值为 0

export class NumberInput extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  public render() {
    return (
      <Styled.Input
        style={this.props.style}
        theme={{
          disabled: this.props.disabled
        }}
        value={this.toNumber(this.props.value).toString()}
        onChange={this.handleChange}
        onClick={this.props.onClick}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled} />
    )
  }

  private handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (typeof this.props.onChange === "function") {
      const value = this.toNumber(event.currentTarget.value as string)
      if (value !== "") {
        this.props.onChange(value)
      } else {
        // 为空字符串时，返回 null
        this.props.onChange(null)
      }
    }
  }

  private toNumber = (value: string | number) => {
    if (value === undefined || value === null) {
      return ""
    }

    if (typeof value !== "string") {
      value = value.toString()
    }

    // 允许使用空字符串
    if (value === "") {
      return ""
    }

    let numberValue = Number(value)

    if (isNaN(numberValue)) {
      numberValue = 0
    }

    if (numberValue > this.props.max) {
      numberValue = this.props.max
    }

    if (numberValue < this.props.min) {
      numberValue = this.props.min
    }

    return numberValue
  }
}
