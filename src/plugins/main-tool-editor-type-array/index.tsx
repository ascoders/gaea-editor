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
class MainToolEditorArray extends React.Component<Props, State> {
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

    // 数组配置
    const editors = this.props.editor.editors as IEditorOptionArray

    // 当前控制数组的值
    const currentValue: any[] = this.props.actions.ViewportAction.getInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, this.props.realField) || []

    // 增加 删除
    const Editors = currentValue.map((eachValue, index) => {
      return (
        <Styled.EachItem key={index}>
          {this.props.actions.ApplicationAction.loadPluginByPosition("mainToolEditorManager", {
            editors,
            realField: this.props.realField + "." + index
          })}
          <Tooltip title="移除此项" position="left">
            <Styled.RemoveIconContainer onClick={this.handleRemove.bind(this, index)}>
              <Icon type="remove" size={14} />
            </Styled.RemoveIconContainer>
          </Tooltip>
        </Styled.EachItem>
      )
    })

    return (
      <Styled.Container>
        <Tooltip title="新增一项" position="right">
          <Styled.AddButton onClick={this.handleAdd}>
            <Icon type="add" size={14} />
          </Styled.AddButton>
        </Tooltip>

        {currentValue.length > 0 &&
          <Styled.ListContainer>
            {Editors}
          </Styled.ListContainer>
        }
      </Styled.Container>
    )
  }

  private handleAdd = () => {
    const currentValue: any[] = this.props.actions.ViewportAction.getInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, this.props.realField) || []

    const assignValue = [...currentValue]

    if (typeof this.props.editor.editors === "string") {
      assignValue.push(null)
    } else {
      // 对象类型
      assignValue.push({})
    }

    this.props.actions.ViewportAction.setInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, this.props.realField, assignValue)
  }

  private handleRemove = (index: number) => {
    const currentValue: any[] = this.props.actions.ViewportAction.getInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, this.props.realField) || []

    const assignValue = [...currentValue]

    // 将此项从数组中移除
    assignValue.splice(index, 1)

    this.props.actions.ViewportAction.setInstanceProps(this.props.stores.ViewportStore.currentEditInstanceKey, this.props.realField, assignValue)
  }
}

export default {
  position: "mainToolEditorTypeArray",
  class: MainToolEditorArray
}
