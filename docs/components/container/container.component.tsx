import * as React from "react"
import * as ReactDOM from "react-dom"

class Props {
  public gaeaSetting = {
    key: "gaea-container",
    name: "容器",
    isContainer: true,
  }

  public style: React.CSSProperties
}

class State { }

export default class Container extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  public render() {
    return (
      <div style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}
