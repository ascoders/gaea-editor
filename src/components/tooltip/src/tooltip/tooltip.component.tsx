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
    // 预留边距
    const space = this.props.showArrow ? 10 : 0

    switch (position) {
      case "left":
        toolTipStyle.left = this.state.childrenLeft - this.state.tooltipWidth - space
        toolTipStyle.top = this.state.childrenTop - (this.state.tooltipHeight / 2 - this.state.childrenHeight / 2)
        break
      case "top":
        toolTipStyle.left = this.state.childrenLeft + this.state.childrenWidth / 2 - this.state.tooltipWidth / 2
        toolTipStyle.top = this.state.childrenTop - this.state.tooltipHeight - space
        break
      case "right":
        toolTipStyle.left = this.state.childrenLeft + this.state.childrenWidth + space
        toolTipStyle.top = this.state.childrenTop - (this.state.tooltipHeight / 2 - this.state.childrenHeight / 2)
        break
      case "bottom":
        toolTipStyle.left = this.state.childrenLeft + this.state.childrenWidth / 2 - this.state.tooltipWidth / 2
        toolTipStyle.top = this.state.childrenTop + this.state.childrenHeight + space
        break
    }
  }

  /**
   * 渲染 tooltip 内部的内容
   */
  private renderTooltip() {
    const toolTipStyle: React.CSSProperties = {
      ...this.props.style,
      zIndex: this.props.zIndex,
      backgroundColor: this.props.showArrow ? "transparent" : null
    }

    // 是否与子元素同高、同宽
    if (this.props.uniformWidth) {
      toolTipStyle.width = this.state.childrenWidth
      if (this.state.tooltipWidth !== toolTipStyle.width) {
        this.setState({
          tooltipWidth: toolTipStyle.width
        })
      }
    }
    if (this.props.uniformHeight) {
      toolTipStyle.height = this.state.childrenHeight
      if (this.state.tooltipHeight !== toolTipStyle.height) {
        this.setState({
          tooltipHeight: toolTipStyle.height
        })
      }
    }

    // 是否有预设的宽高
    if (this.props.width !== 0) {
      toolTipStyle.width = this.props.width
    }

    if (this.props.height !== 0) {
      toolTipStyle.height = this.props.height
    }

    let position = this.props.position
    this.setPosition(toolTipStyle, position)

    // 如果位置溢出了，换一个位置
    if (toolTipStyle.left < 0) {
      this.setPosition(toolTipStyle, "right")
      position = "right"
    }
    if (toolTipStyle.left + toolTipStyle.width > window.outerWidth) {
      this.setPosition(toolTipStyle, "left")
      position = "left"
    }
    if (toolTipStyle.top < 0) {
      this.setPosition(toolTipStyle, "bottom")
      position = "bottom"
    }
    if (toolTipStyle.top + toolTipStyle.height > window.outerHeight) {
      this.setPosition(toolTipStyle, "top")
      position = "top"
    }

    // 如果换过位置，还是溢出，直接将位置缩放到最合适
    // 由于换过位置，因此其对立位置一定不会溢出
    // 比如位置 bottom，那下部空间一定不会溢出，位置 left，左部空间一定不会溢出
    // 因此，上下看左右，左右看上下
    if (position === "bottom" || position === "top") {
      if (toolTipStyle.left < 0) {
        toolTipStyle.left = 0
      }
      if (toolTipStyle.left + toolTipStyle.width > window.outerWidth) {
        toolTipStyle.left = window.outerWidth - toolTipStyle.width
      }
    }

    if (position === "left" || position === "right") {
      if (toolTipStyle.top < 0) {
        toolTipStyle.top = 0
      }
      if (toolTipStyle.top + toolTipStyle.height > window.outerHeight) {
        toolTipStyle.top = window.outerHeight - toolTipStyle.height
      }
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

  private handleDocumentClick = (event: MouseEvent) => {
    // 点击状态，只有不点击自己区域，才会关闭或者 trigger
    if (this.tooltipDom.contains(event.target as HTMLElement)) {
      return
    }

    if (this.state.show) {
      this.setState({
        show: false
      })
    }
  }
}
