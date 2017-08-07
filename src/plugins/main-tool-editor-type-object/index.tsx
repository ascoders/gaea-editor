import { Connect } from "dob-react"
import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import Icon from "../../components/icon/src"
import { Input } from "../../components/input/src"
import { Tooltip } from "../../components/tooltip/src"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

@Connect
class MainToolEditorObject extends React.Component<Props, State> {
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

    // 对象配置
    const editors = this.props.editor.editors as IEditorOptionArray

    const Editors = editors.map((editor, index) => {
      return (
        <Styled.EachItem key={index}>
          {this.props.actions.ApplicationAction.loadPluginByPosition("mainToolEditorManager", {
            editors: [editor],
            realField: this.props.realField + "." + editor.field
          })}
        </Styled.EachItem>
      )
    })

    return (
      <Styled.Container>
        {Editors}
      </Styled.Container>
    )
  }
}

export default {
  position: "mainToolEditorTypeObject",
  class: MainToolEditorObject
}
