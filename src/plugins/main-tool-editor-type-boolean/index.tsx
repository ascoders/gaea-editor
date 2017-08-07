import { Connect } from "dob-react"
import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { Input } from "../../components/input/src"
import { Switch } from "../../components/switch/src"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

@Connect
class MainToolEditorBoolean extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  /**
   * 组件实例的信息
   */
  private instanceInfo: InstanceInfo

  public render() {
    if (!this.props.stores.ViewportStore.instances.has(this.props.stores.ViewportStore.currentEditInstanceKey)) {
      return null
    }

    this.instanceInfo = this.props.stores.ViewportStore.instances.get(this.props.stores.ViewportStore.currentEditInstanceKey)

    const currentValue = !!this.props.actions.ViewportAction.getInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, this.props.realField)

    return (
      <Styled.Container>
        <Switch value={currentValue} onChange={this.handleChange} />
      </Styled.Container>
    )
  }

  private handleChange = (value: boolean) => {
    this.props.actions.ViewportAction.setInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, this.props.realField, value)
  }
}

export default {
  position: "mainToolEditorTypeBoolean",
  class: MainToolEditorBoolean
}
