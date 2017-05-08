export class Props {
  /**
   * 自定义组件
   */
  public componentClasses?: any[] = []

  /**
   * 调用指定方法，这个函数在组件->事件中定义调用自定义函数时使用
   */
  public onCall?: (functionName?: string, param?: any) => void

  /**
   * 页面信息
   */
  public value?: string

  /**
   * 页面配置信息
   */
  public settings?: string
}

export class State {

}
