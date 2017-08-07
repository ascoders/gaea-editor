import { Connect } from "dob-react"
import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import Icon from "../../components/icon/src"
import { TabPanel, Tabs } from "../../components/tabs/src/"
import { Tooltip } from "../../components/tooltip/src"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

@Connect
class MainToolEditorEvent extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

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

    const Events = this.instanceInfo.data && this.instanceInfo.data.events && this.instanceInfo.data.events.map((event, index) => {
      return (
        <Styled.EventContainer key={index}>
          <Styled.EventLeft>
            {this.props.actions.ApplicationAction.loadPluginByPosition(`mainToolEditorEventTrigger`, {
              index
            })}
          </Styled.EventLeft>

          <Styled.EventRight>
            {this.props.actions.ApplicationAction.loadPluginByPosition(`mainToolEditorEventAction`, {
              index
            })}
          </Styled.EventRight>

          <Tooltip title="移除此项" position="left">
            <Styled.RemoveIconContainer onClick={this.handleRemove.bind(this, index)}>
              <Icon type="remove" size={14} />
            </Styled.RemoveIconContainer>
          </Tooltip>
        </Styled.EventContainer>
      )
    })

    return (
      <Styled.Container>
        <Styled.TabTitle>
          <span>事件</span>
          <Tooltip title="新增事件" position="right">
            <Styled.AddButton onClick={this.handleAdd}>
              <Icon type="add" size={14} />
            </Styled.AddButton>
          </Tooltip>
        </Styled.TabTitle>

        <Styled.EventList>
          {Events}
        </Styled.EventList>
      </Styled.Container>
    )
  }

  private handleAdd = () => {
    this.props.actions.ViewportAction.instanceAddEvent(this.props.stores.ViewportStore.currentEditInstanceKey)
  }

  private handleRemove = (index: number) => {
    this.props.actions.ViewportAction.instanceRemoveEvent(this.props.stores.ViewportStore.currentEditInstanceKey, index)
  }
}

export default {
  position: "mainToolEditorEvent",
  class: MainToolEditorEvent
}
