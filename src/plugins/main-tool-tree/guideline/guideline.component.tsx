import { Connect } from "dynamic-react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Styled from "./guideline.style"
import * as typings from "./guideline.type"

@Connect
export default class Guideline extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  public componentWillReact() {
    if (this.props.stores.ViewportStore.currentHoverInstanceKey === null || this.props.stores.TreeStore.currentHoverTreeDom === undefined) {
      return
    }

    // 正在拖拽中不显示
    if (this.props.stores.ViewportStore.currentDragInfo !== null) {
      return
    }

    // 让 dom 树外层滚动到这个元素上
    const nodeDom = ReactDOM.findDOMNode(this.props.stores.TreeStore.currentHoverTreeDom).getBoundingClientRect()
    const containerDom = this.props.stores.TreeStore.treeRootDom.getBoundingClientRect()

    // 如果超过一定范围，就移动
    if (nodeDom.top - containerDom.top < 20 || nodeDom.top - containerDom.top > containerDom.height - 50) {
      // containerDom.stop().animate({
      //   scrollTop: nodeDom.top - containerDom.top + containerDom.scrollTop() - 50
      // }, 50)
    }
  }

  public render() {
    if (this.props.stores.ViewportStore.currentHoverInstanceKey === null || this.props.stores.TreeStore.currentHoverTreeDom === undefined) {
      return null
    }

    // 正在拖拽中不显示
    if (this.props.stores.ViewportStore.currentDragInfo !== null) {
      return null
    }

    const hoverBoundingClientRect = this.props.stores.TreeStore.currentHoverTreeDom.getBoundingClientRect()
    const rootBoundingClientRect = this.props.stores.TreeStore.treeRootDom.getBoundingClientRect()

    const style = {
      width: hoverBoundingClientRect.width - 4,
      height: hoverBoundingClientRect.height - 4,
      left: hoverBoundingClientRect.left - rootBoundingClientRect.left,
      top: hoverBoundingClientRect.top - rootBoundingClientRect.top + this.props.stores.TreeStore.treeRootDom.scrollTop
    }

    return (
      <Styled.Container style={style} />
    )
  }
}
