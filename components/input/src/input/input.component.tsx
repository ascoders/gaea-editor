import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Styled from "./input.style"
import { Props, State } from "./input.type"

export class Input extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  public render(): any {
    return (
      <Styled.Input
        theme={{
          disabled: this.props.disabled
        }}
        value={this.props.value}
        onChange={this.handleChange}
        disabled={this.props.disabled} />
    )
  }

  private handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(event.currentTarget.value as string)
    }
  }
}
