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

  /**
   * 组件的编辑信息
   */
  private setting: IGaeaSetting

  public render() {
    // 当前编辑组件的 key
    const instanceKey = this.props.stores.ViewportStore.currentEditInstanceKey

    if (!instanceKey) {
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

    if (!this.props.stores.ViewportStore.instances.has(instanceKey)) {
      return null
    }

    this.instanceInfo = this.props.stores.ViewportStore.instances.get(instanceKey)

    this.componentClass = this.props.actions.ApplicationAction.getComponentClassByKey(this.instanceInfo.gaeaKey)

    // 优先从 preGaeaKey 取配置，因为可能是一个预设组件
    this.setting = this.props.actions.ApplicationAction.getSettingByInstance(this.instanceInfo)

    if (!this.setting || !this.setting.editor || this.setting.editor.length === 0) {
      return (
        <Styled.EmptyContainer>
          <Styled.EmptyTitle>
            无编辑信息
          </Styled.EmptyTitle>
          <Styled.EmptyDescription>
            该组件还未添加编辑信息，<a href="https://github.com/ascoders/gaea-editor" target="_blank">点击了解如何添加</a>
          </Styled.EmptyDescription>
        </Styled.EmptyContainer>
      )
    }

    if (this.setting.isLoading) {
      return (
        <Styled.EmptyContainer>
          <Styled.EmptyTitle>
            加载中..
          </Styled.EmptyTitle>
          <Styled.EmptyDescription>
            正在获取组件配置信息，请耐心等待
          </Styled.EmptyDescription>
        </Styled.EmptyContainer>
      )
    }

    const EditorFields = this.setting.editor.map((editor, index) => {
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
          <span>{this.setting.name}</span>
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
