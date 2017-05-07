import { Connect } from "dynamic-react"
import * as React from "react"
import * as Styled from "./index.style"
import * as typings from "./index.type"

@Connect
class ViewportGuideline extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  public componentDidMount() {
    this.props.actions.EventAction.on(this.props.stores.EventStore.viewportUpdated, this.handleViewportUpdated)
  }

  public componentWillUnmount() {
    this.props.actions.EventAction.off(this.props.stores.EventStore.viewportUpdated, this.handleViewportUpdated)
  }

  /**
   * 视图区域更新时触发
   */
  public handleViewportUpdated = () => {
    this.forceUpdate()
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
      width: targetBoundingClientRect.width - 2,
      height: targetBoundingClientRect.height - 2,
      top: targetBoundingClientRect.top - viewportBoundingClientRect.top,
      left: targetBoundingClientRect.left - viewportBoundingClientRect.left
    }

    return (
      <Styled.Container style={style} />
    )
  }
}

export default {
  position: "viewport",
  class: ViewportGuideline
}
