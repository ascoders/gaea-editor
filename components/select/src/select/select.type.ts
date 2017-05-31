import * as React from "react"

export class Props {
  /**
   * 级联是否为完整路径
   */
  public cascaderFull?: boolean

  /**
   * 是否可筛选
   */
  public search?: boolean = false

  /**
   * 极简模式,适合在文本中做选择框
   */
  public simple?: boolean = false

  /**
   * 配置项,这个项目存在,将忽略对子元素 Option 处理
   */
  public options?: IOptions[]
  /**
   * 触发选择的回调
   */
  public onChange?: (value?: string | string[], index?: number) => void
  public value?: string = ""
  public defaultValue?: string = ""

  public style?: React.CSSProperties = {}
}

export class State {
  public open?: boolean = false
  public value?: string = null
  public searchValue?: string = ""

  /**
   * 显示值
   */
  public labelValue?: string = ""

  /**
   * 存储了级联列表
   */
  public cascader?: ICascaderOption[] = []

  /**
   * option key 前缀，当 props 更新时，要重新刷新 options，就为了调用 willMount 方法
   * 因为为了找到 activeLabel，必须在子元素里做（因为可能不是通过配置设置的），但这样会有循环引用，所以强刷新
   */
  public optionKeyPrefix?: string = ""
}

/**
 * 配置项
 */
export interface IOptions {
  /**
   * 值
   */
  key?: string,

  /**
   * 显示字符串
   */
  value?: string,

  /**
   * 子元素,二层深度以上子元素表示级联
   */
  children?: IOptions[]

  /**
   * 表示自己是分组,children不再表示级联,而是普通子元素,value key属性无效
   */
  groupValue?: string
}

/**
 * 级联元素配置项
 */
export interface ICascaderOption {
  /**
   * 当前级联选中值
   */
  value: string

  /**
   * 级联配置
   */
  options: IOptions[]

  /**
   * 当前显示值,给级联完整路径在输入框显示时使用
   */
  labelValue?: string
}
