import { Connect } from "dob-react"
import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { Input } from "../../components/input/src"
import { Select } from "../../components/select/src"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

const sep = ":"

@Connect
class MainToolEditorVariable extends React.Component<Props, State> {
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

    const options = this.getVariableOptions()

    let value = null
    const variable = this.instanceInfo.variables && this.instanceInfo.variables[this.props.realField]

    if (variable) {
      value = variable.type + sep + variable.key
    }

    return (
      <Styled.Container>
        <Select
          value={value}
          options={options}
          onChange={this.handleSelectVariable}
        />
      </Styled.Container>
    )
  }

  /**
   * 获得当前元素能得到的变量列表
   */
  private getVariableOptions = () => {
    const options = []

    // 先看看是否存在当前层级的变量
    const siblingOptions: Array<{
      key: string,
      value: string
    }> = []

    // 从同级实例中查找
    this.props.actions.ViewportAction.getSiblingInstances(this.props.stores.ViewportStore.currentEditInstanceKey).forEach(instance => {
      if (instance.data.events) {
        instance.data.events.forEach(event => {
          const params = this.props.actions.ViewportAction.eventGetSiblingParam(event)
          if (params) {
            params.forEach(param => {
              siblingOptions.push({
                key: "sibling:" + param,
                value: param
              })
            })
          }
        })
      }
    })

    if (siblingOptions.length > 0) {
      options.push({
        groupValue: "当前层级",
        children: siblingOptions
      })
    }

    return options
  }

  private handleSelectVariable = (value: string) => {
    // 使用 : 分割分类与值
    const splitValue = value.split(sep)
    const type = splitValue[0] as InstanceInfoVariableType
    const key = splitValue.slice(1, splitValue.length).join(sep)
    this.props.actions.ViewportAction.instanceSetVariable(this.props.stores.ViewportStore.currentEditInstanceKey, this.props.realField, {
      type,
      key
    })
  }
}

export default {
  position: "mainToolEditorVariable",
  class: MainToolEditorVariable
}
