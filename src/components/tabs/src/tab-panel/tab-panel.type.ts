import * as React from "react"

export class Props {
  /**
   * 对应Tabs的defaultActiveKey
   */
  public activeKey?: string = ""
  /**
   * 标签名
   */
  public tab?: string = ""
  /**
   * 是否处于显示状态
   */
  public active?: boolean = false
  /**
   * 标签名,可以渲染任意 React 元素
   */
  public tabRender?: (isActive?: boolean) => React.ReactElement<any>
}

export class State {

}
