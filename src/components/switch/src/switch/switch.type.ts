import * as React from "react"

export class Props {
  /**
   * 是否选中
   */
  public value?: boolean = null

  /**
   * 默认是否选中
   */
  public defaultValue?: boolean = null

  /**
   * 是否禁用
   */
  public disabled?: boolean

  /**
   * 大小 'normal' | 'small' | 'large'
   */
  public size?: string = "normal"

  /**
   * 主题颜色 'info' | 'success' | 'primary' | 'danger' | 'warning' | 'dark'
   */
  public type?: string = "info"

  /**
   * 选中时追加渲染内容
   */
  public checkedChildrenRender?: React.ReactElement<any>

  /**
   * 没选中时追加渲染内容
   */
  public unCheckedChildrenRender?: React.ReactElement<any>

  /**
   * 选中状态改变
   */
  public onChange?: (checked?: boolean) => void = () => {
    //
  }
}

export class State {
  public checked?: boolean = false
}
