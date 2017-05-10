import * as classNames from "classnames"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Styled from "./icon.style"
import * as typings from "./icon.type"

import close from "../icons/close"

const iconMap = new Map<string, (size: number) => React.ReactElement<any>>()
iconMap.set("close", close)

export class Icon extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  public render() {
    return (
      <Styled.Container>
        {iconMap.get(this.props.type)(this.props.size)}
      </Styled.Container>
    )
  }
}
