import * as React from "react"

export class Props {
  /**
   * 分组的标签名
   */
  public label: string = "分组"

  /**
   * 不对子元素透传配置,变量配置时开启
   */
  public ignoreChildren?: boolean = false

  /**
   * 点击的回调
   * @ignore
   */
  public onClick?: (value: string, value2: string) => void

  /**
   * 是否激活
   * @ignore
   */
  public active?: boolean

  /**
   * 子元素
   * @ignore
   */
  public optChildren?: any

  /**
   * 设置label
   * @ignore
   */
  public setLabelValue?: (value?: string) => void

  /**
   * @ignore
   */
  public activeValue?: string

  /**
   * @ignore
   */
  public searchValue?: string
}

export class State {

}
