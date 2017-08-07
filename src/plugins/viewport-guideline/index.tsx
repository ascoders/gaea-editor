import { Connect } from "dob-react"
import * as React from "react"
import * as Styled from "./index.style"
import * as typings from "./index.type"

@Connect
class ViewportGuideline extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  private timeOut: any

  public componentDidMount() {
    this.props.actions.EventAction.on(this.props.stores.EventStore.viewportUpdated, this.handleViewportUpdated)
    this.updateTimeout()
  }

  public componentWillUnmount() {
    this.props.actions.EventAction.off(this.props.stores.EventStore.viewportUpdated, this.handleViewportUpdated)
    clearTimeout(this.timeOut)
  }

  public render() {
    // 正在拖拽中不显示
    if (this.props.stores.ViewportStore.currentDragInfo !== null) {
      return null
    }

    // 没有 hover 元素不显示
    if (this.props.stores.ViewportStore.currentHoverInstanceKey === null) {
      return null
    }

    const targetBoundingClientRect = this.props.stores.ViewportStore.instanceDoms.get(this.props.stores.ViewportStore.currentHoverInstanceKey).getBoundingClientRect()
    const viewportBoundingClientRect = this.props.stores.ViewportStore.viewportDOM.getBoundingClientRect()

    const style = {
      width: targetBoundingClientRect.width - 1,
      height: targetBoundingClientRect.height - 1,
      top: targetBoundingClientRect.top - viewportBoundingClientRect.top,
      left: targetBoundingClientRect.left - viewportBoundingClientRect.left
    }

    return (
      <Styled.Container style={style} />
    )
  }

  /**
   * 视图区域更新时触发
   */
  private handleViewportUpdated = () => {
    this.forceUpdate()
    this.updateTimeout()
  }

  /**
   * 更新定时器
   */
  private updateTimeout = () => {
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }

    this.timeOut = setInterval(() => {
      if (this.props.stores.ViewportStore.currentDragInfo !== null) {
        return null
      }

      // 没有 hover 元素不显示
      if (this.props.stores.ViewportStore.currentHoverInstanceKey === null) {
        return null
      }

      this.forceUpdate()
    }, 200)
  }
}

export default {
  position: "viewport",
  class: ViewportGuideline
}
