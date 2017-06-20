import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Styled from "./switch.style"
import { Props, State } from "./switch.type"

export class Switch extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  public componentWillMount() {
    let checked = false
    if (this.props.defaultValue !== null) {
      checked = this.props.defaultValue
    }
    if (this.props.value !== null) {
      checked = this.props.value
    }

    this.state = {
      checked
    }
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== null && nextProps.value !== undefined) {
      this.setState({
        checked: nextProps.value
      })
    }
  }

  public render() {
    return (
      <Styled.Container
        theme={{
          checked: this.state.checked,
          disabled: this.props.disabled,
          size: this.props.size,
          type: this.props.type
        }}
        onClick={this.props.disabled ? null : this.toggle.bind(this)}>
        <Styled.Inner theme={{
          checked: this.state.checked,
          disabled: this.props.disabled,
          size: this.props.size,
          type: this.props.type
        }}>
          {this.state.checked ? this.props.checkedChildrenRender : this.props.unCheckedChildrenRender}
        </Styled.Inner>
      </Styled.Container>
    )
  }

  private toggle() {
    const checked = !this.state.checked
    this.setState({
      checked
    })
    this.props.onChange(checked)
  }
}
