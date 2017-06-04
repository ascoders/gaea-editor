import * as React from "react"

export class Props {
  /**
   * 内容
   */
  public title?: string | (() => React.ReactElement<any>) = ""

  /**
   * 期望位置
   * 但如果期望位置放不下了，将会自动找一个合适的位置替代
   */
  public position?: Position = "bottom"

  /**
   * 工具栏纵向层级
   */
  public zIndex?: number = 102

  /**
   * 遮罩层纵向层级
   */
  public shadowZIndex?: number = 101

  /**
   * 遮罩层样式
   */
  public shadowStyle?: React.CSSProperties

  /**
   * 出现方式
   */
  public type?: ShowType = "hover"

  /**
   * 是否显示 tooltip 时同时显示遮罩层
   */
  public showShadow?: boolean = false

  /**
   * 是否显示箭头
   */
  public showArrow?: boolean = true

  /**
   * 弹出层
   */
  public style?: React.CSSProperties = {}

  /**
   * 是否与修饰元素宽度一致
   */
  public uniformWidth?: boolean = false

  /**
   * 是否与修饰元素高度一致
   */
  public uniformHeight?: boolean = false

  /**
   * 预设 tooltip 内容区域宽度，方便计算
   */
  public width?: number = 0

  /**
   * 预设 tooltip 内容区域高度，方便计算
   */
  public height?: number = 0
}

export class State {
  /**
   * 子元素相对父级的位置
   */
  public childrenTop?: number = 0
  public childrenLeft?: number = 0
  public childrenWidth?: number = 0
  public childrenHeight?: number = 0

  /**
   * tooltip 宽高
   */
  public tooltipWidth?: number = 0
  public tooltipHeight?: number = 0

  /**
   * 是否显示 tooltip
   */
  public show?: boolean = false
}

export type Position = "left" | "top" | "right" | "bottom"

export type ShowType = "hover" | "click"
