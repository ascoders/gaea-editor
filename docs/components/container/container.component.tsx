import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Props {
  gaeaSetting = {
    key: 'gaea-container',
    name: '容器',
    isContainer: true
  }
}

class State { }

export default class Container extends React.Component<Props, State> {
  static defaultProps = new Props()
  public state = new State()

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}