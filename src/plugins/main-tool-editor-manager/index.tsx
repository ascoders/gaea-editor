import { Connect } from "dynamic-react"
import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import Icon from "../../../components/icon/src"
import { TabPanel, Tabs } from "../../../components/tabs/src/"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

@Connect
class MainToolEditorManager extends React.Component<Props, State> {
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
    // 当前编辑组件的 key
    const instanceKey = this.props.stores.ViewportStore.currentEditInstanceKey

    if (!this.props.stores.ViewportStore.instances.has(instanceKey)) {
      return null
    }

    this.instanceInfo = this.props.stores.ViewportStore.instances.get(instanceKey)
    this.componentClass = this.props.actions.ApplicationAction.getComponentClassByKey(this.instanceInfo.gaeaKey)

    // 如果没有传入 editor，就使用组件根节点的 editor
    const editors = this.props.editors || this.props.actions.ApplicationAction.getSettingByInstance(this.instanceInfo).editors || []

    const EditorFields = editors.map((editor, index) => {
      if (typeof editor === "string") {
        return (
          <Styled.TabTitle key={index}>{editor}</Styled.TabTitle>
        )
      } else {
        return (
          <Styled.EditorContainer key={index}>
            {this.props.actions.ApplicationAction.loadPluginByPosition(`mainToolEditor${_.upperFirst(_.camelCase(editor.type))}`, {
              editor,
              realField: this.props.realField === "" ? editor.field : this.props.realField + "." + editor.field
            })}
          </Styled.EditorContainer>
        )
      }
    })

    return (
      <div>{EditorFields}</div>
    )
  }
}

export default {
  position: "mainToolEditorManager",
  class: MainToolEditorManager
}
