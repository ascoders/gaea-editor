import * as React from "react"
import Event from "./event"

export default class Preview {
  public event = new Event()

  /**
   * 基础组件
   */
  public componentClasses = new Map<string, React.ComponentClass<IGaeaProps>>()

  /**
   * 已实例化在编辑区域组件的集合
   */
  public instances = new Map<string, InstanceInfo>()

  /**
   * 根节点的唯一 id
   */
  public rootInstanceKey: string

  /**
   * 全局参数
   */
  public params: any = {}

  /**
   * 用户设置
   */
  public settings: any = {}

  /**
   * 设置基础组件
   */
  public addComponentClass(componentClass: React.ComponentClass<IGaeaProps>) {
    this.componentClasses.set(componentClass.defaultProps.gaeaSetting.key, componentClass)
  }

  /**
   * 设置根节点唯一 id
   */
  public setRootUniqueId(uniqueId: string) {
    this.rootInstanceKey = uniqueId
  }

  public setParams(params: any) {
    this.params = params
  }

  public setSettings(settings: any) {
    this.settings = settings
  }
}
