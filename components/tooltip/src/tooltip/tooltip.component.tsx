import * as React from "react"
import * as ReactDOM from "react-dom"
import { RenderTo } from "../../../render-to/src"
import * as Styled from "./tooltip.style"
import * as typings from "./tooltip.type"

export class Tooltip extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  private childrenRef: React.ReactInstance
  private childrenDom: Element
  private tooltipDom: Element
  private tooltipShadowDom: Element

  public componentDidMount() {
    this.childrenDom = ReactDOM.findDOMNode(this.childrenRef)

    this.childrenDom.addEventListener("mouseover", this.handleChildrenMouseOver)
    this.childrenDom.addEventListener("mouseleave", this.handleChildrenMouseLeave)
    this.childrenDom.addEventListener("click", this.handleChildrenClick)

    // 在 body 生成 tooltip
    this.tooltipDom = document.createElement("div")

    document.body.appendChild(this.tooltipDom)

    if (this.props.showShadow) {
      this.tooltipShadowDom = document.createElement("div")
      document.body.appendChild(this.tooltipShadowDom)
    }
    this.renderTooltip()
  }

  public componentWillUnmount() {
    this.childrenDom.removeEventListener("mouseover", this.handleChildrenMouseOver)
    this.childrenDom.removeEventListener("mouseleave", this.handleChildrenMouseLeave)
    this.childrenDom.addEventListener("click", this.handleChildrenClick)

    // 移除全局监听
    document.removeEventListener("click", this.handleDocumentClick)

    // 在 body 移除 tooltip
    document.body.removeChild(this.tooltipDom)

    if (this.props.showShadow) {
      document.body.removeChild(this.tooltipShadowDom)
    }
  }

  public componentDidUpdate() {
    this.renderTooltip()
  }

  public render() {
    const children = React.cloneElement(React.Children.only(this.props.children), {
      ref: (ref: React.ReactInstance) => {
        this.childrenRef = ref
      }
    })

    return children
  }

  /**
   * 显示元素在相应的位置
   */
  private showTooltipPosition = () => {
    const childrenBoundingClientRect = this.childrenDom.getBoundingClientRect()
    const tooltipSpanDom = this.tooltipDom.childNodes[0] as Element
    const tooltipSpanBoundingClientRect = tooltipSpanDom.getBoundingClientRect()

    this.setState({
      childrenLeft: childrenBoundingClientRect.left + document.body.scrollLeft,
      childrenTop: childrenBoundingClientRect.top + document.body.scrollTop,
      childrenWidth: childrenBoundingClientRect.width,
      childrenHeight: childrenBoundingClientRect.height,
      tooltipWidth: tooltipSpanBoundingClientRect.width,
      tooltipHeight: tooltipSpanBoundingClientRect.height,
      show: true
    })
  }

  /**
   * 鼠标点击 children
   */
  private handleChildrenClick = (event: MouseEvent) => {
    if (this.props.type !== "click") {
      return
    }

    if (!this.state.show) {
      this.showTooltipPosition()
    } else {
      this.handleClose()
    }
  }

  /**
   * 鼠标滑到 children
   */
  private handleChildrenMouseOver = (event: MouseEvent) => {
    if (this.props.type !== "hover") {
      return
    }

    this.showTooltipPosition()
  }

  /**
   * 鼠标离开 children
   */
  private handleChildrenMouseLeave = (event: MouseEvent) => {
    if (this.props.type !== "hover") {
      return
    }

    this.handleClose()
  }

  /**
   * 关闭 tooltip
   */
  private handleClose = () => {
    this.setState({
      show: false
    })
  }

  /**
   * 根据位置计算 left top
   */
  private setPosition = (toolTipStyle: React.CSSProperties, position: string) => {
    switch (position) {
      case "left":
        toolTipStyle.left = this.state.childrenLeft - this.state.tooltipWidth - 7
        toolTipStyle.top = this.state.childrenTop - (this.state.tooltipHeight / 2 - this.state.childrenHeight / 2)
        break
      case "top":
        toolTipStyle.left = this.state.childrenLeft + this.state.childrenWidth / 2 - this.state.tooltipWidth / 2
        toolTipStyle.top = this.state.childrenTop - this.state.tooltipHeight - 7
        break
      case "right":
        toolTipStyle.left = this.state.childrenLeft + this.state.childrenWidth + 7
        toolTipStyle.top = this.state.childrenTop - (this.state.tooltipHeight / 2 - this.state.childrenHeight / 2)
        break
      case "bottom":
        toolTipStyle.left = this.state.childrenLeft + this.state.childrenWidth / 2 - this.state.tooltipWidth / 2
        toolTipStyle.top = this.state.childrenTop + this.state.childrenHeight + 7
        break
    }
  }

  /**
   * 渲染 tooltip 内部的内容
   */
  private renderTooltip() {
    const toolTipStyle: React.CSSProperties = {
      zIndex: this.props.zIndex,
      backgroundColor: this.props.showArrow ? "transparent" : null
    }
    let position = this.props.position
    this.setPosition(toolTipStyle, position)

    // 如果位置有问题，换一个位置
    if (toolTipStyle.left < 0) {
      this.setPosition(toolTipStyle, "right")
      position = "right"
    }
    if (toolTipStyle.right > window.outerWidth) {
      this.setPosition(toolTipStyle, "left")
      position = "left"
    }
    if (toolTipStyle.top < 0) {
      this.setPosition(toolTipStyle, "bottom")
      position = "bottom"
    }
    if (toolTipStyle.top > window.outerHeight) {
      this.setPosition(toolTipStyle, "top")
      position = "top"
    }

    const TooltipElement = (
      <Styled.Container style={toolTipStyle} theme={{
        showArrow: this.props.showArrow,
        active: this.state.show,
        position
      }}>
        {typeof this.props.title === "string" ?
          <Styled.DefaultTitle>{this.props.title}</Styled.DefaultTitle> :
          this.props.title()
        }
      </Styled.Container>
    )

    const TooltipShadowElement = (
      <Styled.TooltipShallow onClick={this.handleClose} theme={{ isShow: this.state.show, zIndex: this.props.shadowZIndex }} />
    )

    ReactDOM.render(TooltipElement, this.tooltipDom)
    if (this.props.showShadow) {
      ReactDOM.render(TooltipShadowElement, this.tooltipShadowDom)
    }

    setImmediate(() => {
      if (this.state.show) {
        // 添加全局监听
        document.addEventListener("click", this.handleDocumentClick)
      } else {
        // 添加全局监听
        document.removeEventListener("click", this.handleDocumentClick)
      }
    })
  }

  private handleDocumentClick = () => {
    if (this.state.show) {
      this.setState({
        show: false
      })
    }
  }
}
