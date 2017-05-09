import gaeaBasicComponents from "gaea-basic-components"
import * as _ from "lodash"
import * as LZString from "lz-string"
import * as React from "react"
import ViewportStore from "../store/viewport"
import Helper from "./helper/helper.component"
import { Props, State } from "./render.type"

export class GaeaRender extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  private viewport = new ViewportStore()

  public componentWillMount() {
    // 设置基础组件
    gaeaBasicComponents.concat(this.props.componentClasses).forEach(componentClass => {
      this.viewport.addComponentClass(componentClass)
    })

    // 设置外部传参 todo
    this.viewport.setParams({})

    // 设置用户设置 todo

    // 解析 base64 的 value
    let unCompressValue: {
      [instanceKey: string]: InstanceInfo
    } = {}

    if (this.props.value) {
      unCompressValue = JSON.parse(LZString.decompressFromBase64(this.props.value))
    }

    Object.keys(unCompressValue).forEach(instanceKey => {
      const instanceInfo = unCompressValue[instanceKey]
      this.viewport.instances.set(instanceKey, instanceInfo)

      // 设置根 mapUniqueKey
      if (instanceInfo.parentInstanceKey === null) {
        this.viewport.setRootUniqueId(instanceKey)
      }
    })

    this.viewport.event.on(this.viewport.event.onCall, this.handleOnCall)
  }

  public componentWillUnmount() {
    this.viewport.event.off(this.viewport.event.onCall, this.handleOnCall)
  }

  /**
   * 触发调用事件
   */
  public handleOnCall = (context: any, eventData: any) => {
    if (this.props.onCall) {
      this.props.onCall(eventData.functionName, eventData.param)
    }
  }

  public render() {
    if (!this.viewport.rootInstanceKey) {
      return null
    }

    return (
      <Helper viewport={this.viewport}
        instanceKey={this.viewport.rootInstanceKey} />
    )
  }
}
