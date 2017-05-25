export class Props {
  /**
   * React class you want to drag with
   */
  public componentClasses?: Array<React.ComponentClass<IGaeaProps>> = []

  /**
   * custom plugins include jsx and stores
   */
  public plugins?: IPlugin[] = []
  /**
   * 当保存按钮被点击时
   */
  public onSave?: (info: string) => void
  /**
   * 已经保存的数据
   */
  public value?: string = null
}

export class State {
}
