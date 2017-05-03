import * as classNames from "classnames"
import * as React from "react"
import * as Styled from "./tab-panel.style"
import * as typings from "./tab-panel.type"

export class TabPanel extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  public render() {
    if (!this.props.active) {
      return null
    }

    return (
      <Styled.Container>
        {this.props.children}
      </Styled.Container>
    )
  }
}
