import { Connect } from "dynamic-react"
import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import Icon from "../../../components/icon/src"
import { Select } from "../../../components/select/src"
import { TabPanel, Tabs } from "../../../components/tabs/src/"
import { Tooltip } from "../../../components/tooltip/src"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

const actionOptions = [{
  key: "none",
  value: "无"
}, {
  key: "passingSiblingNodes",
  value: "传给同级"
}]

@Connect
class MainToolEditorEventAction extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  /**
   * 组件实例的信息
   */
  private instanceInfo: InstanceInfo

  /**
   * 当前事件数据
   */
  private currentEventInfo: InstanceInfoEvent = null

  public render() {
    // 当前编辑组件的 key
    const instanceKey = this.props.stores.ViewportStore.currentEditInstanceKey

    if (!this.props.stores.ViewportStore.instances.has(instanceKey)) {
      return null
    }

    this.instanceInfo = this.props.stores.ViewportStore.instances.get(instanceKey)

    this.currentEventInfo = this.instanceInfo.data.events[this.props.index]

    if (!this.currentEventInfo) {
      return null
    }

    return (
      <Styled.Container>
        <Styled.HeaderContainer>
          <Styled.Label>
            动作
        </Styled.Label>
          <Select
            options={actionOptions}
            style={{ width: 70 }}
            value={this.currentEventInfo.action}
            onChange={this.handleChangeAction}
          />
        </Styled.HeaderContainer>
      </Styled.Container>
    )
  }

  private handleChangeAction = (value: InstanceInfoEventAction) => {
    this.props.actions.ViewportAction.instanceSetEvent(this.props.stores.ViewportStore.currentEditInstanceKey, this.props.index, {
      ...this.currentEventInfo,
      action: value
    })
  }
}

export default {
  position: "mainToolEditorEventAction",
  class: MainToolEditorEventAction
}
