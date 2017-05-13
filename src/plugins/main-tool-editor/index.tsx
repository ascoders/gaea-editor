import { Connect } from "dynamic-react"
import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import Icon from "../../../components/icon/src"
import { TabPanel, Tabs } from "../../../components/tabs/src/"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

@Connect
class MainToolEditor extends React.Component<Props, State> {
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
    if (!this.props.stores.ViewportStore.currentEditInstanceKey) {
      return (
        <Styled.EmptyContainer>
          <Styled.EmptyTitle>
            未选中元素
          </Styled.EmptyTitle>
          <Styled.EmptyDescription>
            在左侧区选择一个元素，以开启编辑功能
          </Styled.EmptyDescription>
        </Styled.EmptyContainer>
      )
    }

    this.instanceInfo = this.props.stores.ViewportStore.instances.get(this.props.stores.ViewportStore.currentEditInstanceKey)
    this.componentClass = this.props.actions.ApplicationAction.getComponentClassByKey(this.instanceInfo.gaeaKey)

    const EditorFields = this.componentClass.defaultProps.gaeaSetting.editor && this.componentClass.defaultProps.gaeaSetting.editor.map((editor, index) => {
      if (typeof editor === "string") {
        return (
          <Styled.TabTitle key={index}>{editor}</Styled.TabTitle>
        )
      } else {
        return (
          <div key={index}>
            {this.props.actions.ApplicationAction.loadingPluginByPosition(`mainToolEditor${_.upperFirst(_.camelCase(editor.type))}`, {
              editor
            })}
          </div>
        )
      }
    })

    return (
      <Styled.Container>
        <Styled.ComponentName>
          <span>{this.componentClass.defaultProps.gaeaSetting.name}</span>
          <Styled.CloseButton onClick={this.handleClose}>
            <Icon type="close" size={15} />
          </Styled.CloseButton>
        </Styled.ComponentName>
        {EditorFields}

        {this.props.actions.ApplicationAction.loadingPluginByPosition("mainToolEditorAddon")}
      </Styled.Container>
    )
  }

  private handleClose = () => {
    this.props.actions.ViewportAction.setCurrentEditInstanceKey(null)
  }
}

export default {
  position: "mainToolEditor",
  class: MainToolEditor
}
