import { Connect } from "dynamic-react"
import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { Input } from "../../../components/input/src"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

@Connect
class MainToolEditorString extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  /**
   * 组件的类
   */
  private componentClass: React.ComponentClass<IGaeaProps>

  /**
   * 组件实例的信息
   */
  private instanceInfo: InstanceInfo

  public render() {
    if (!this.props.stores.ViewportStore.instances.has(this.props.stores.ViewportStore.currentEditInstanceKey)) {
      return null
    }

    this.instanceInfo = this.props.stores.ViewportStore.instances.get(this.props.stores.ViewportStore.currentEditInstanceKey)
    this.componentClass = this.props.actions.ApplicationAction.getComponentClassByKey(this.instanceInfo.gaeaKey)

    let currentValue: string = this.props.actions.ViewportAction.getInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, this.props.realField)

    currentValue = currentValue ? currentValue.toString() : ""

    return (
      <Styled.Container>
        <Styled.Label>
          {this.props.editor.label}
        </Styled.Label>
        <Input value={currentValue} onChange={this.handleChange} />
      </Styled.Container>
    )
  }

  private handleChange = (value: string) => {
    this.props.actions.ViewportAction.setInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, this.props.realField, value)
  }
}

export default {
  position: "mainToolEditorString",
  class: MainToolEditorString
}
