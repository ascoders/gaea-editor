import * as React from "react"

export type MarginPaddingField = "paddingLeft" | "paddingTop" | "paddingRight" | "paddingBottom" | "marginLeft" | "marginTop" | "marginRight" | "marginBottom" | ""

export class Props {
  /**
   * 大小
   */
  public size?: number = 200

  /**
   * paddingLeft 初始值
   */
  public paddingLeft?: number = 0
  // paddingTop 初始值
  public paddingTop?: number = 0
  // paddingRight 初始值
  public paddingRight?: number = 0
  // paddingBottom 初始值
  public paddingBottom?: number = 0
  // marginLeft 初始值
  public marginLeft?: number = 0
  // marginTop 初始值
  public marginTop?: number = 0
  // marginRight 初始值
  public marginRight?: number = 0
  // marginBottom 初始值
  public marginBottom?: number = 0

  /**
   * 当鼠标按下的时候
   */
  public onStart?: () => void = () => {
    //
  }

  /**
   * 当值修改的时候
   */
  public onChange?: (type: MarginPaddingField, value: number) => void = () => {
    //
  }

  /**
   * 忽略拖动的改动，这个方法会在修改完最终调用一次
   * 在记录历史记录时，用这个会保证低频，而且不会遗漏每次修改，只会忽略拖动的中间过程
   */
  public onFinalChange?: (type?: MarginPaddingField, value?: number) => void = () => {
    //
  }
}

export class State {
  public paddingLeft?: number
  public paddingTop?: number
  public paddingRight?: number
  public paddingBottom?: number
  public marginLeft?: number
  public marginTop?: number
  public marginRight?: number
  public marginBottom?: number
  [x: string]: any
}
