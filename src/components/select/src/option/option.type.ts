import * as React from "react"

export class Props {
  /**
   * 回调响应的值
   */
  public value?: string = ""

  /**
   * 禁用
   */
  public disabled?: boolean = false

  /**
   * 层级,普通是1,级联后依次递增
   */
  public zIndex?: number = 1

  /**
   * 点击的回调
   * @ignore
   */
  public onClick?: (value: string, value2: string, value3: any, zIndex: number) => void

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
  public setLabelValue?: (value: string, labelValue: string) => void

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
