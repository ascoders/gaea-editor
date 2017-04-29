import * as classNames from "classnames"
import * as React from "react"
import * as typings from "./tab-panel.type"

export class TabPanel extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  public render() {
    if (!this.props.active) {
      return null
    }

    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
