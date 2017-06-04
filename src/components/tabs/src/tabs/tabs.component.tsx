import * as classNames from "classnames"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Styled from "./tabs.style"
import * as typings from "./tabs.type"

const renderTab = (name: string) => {
  return (active: boolean) => {
    if (!active) {
      return (
        <div className="center-text">{name}</div>
      )
    } else {
      return (
        <div className="tab-bar-content">
          <div className="tab-bar-left">
            <div className="tab-bar-left-nav"></div>
          </div>
          {name}
          <div className="tab-bar-right">
            <div className="tab-bar-right-nav"></div>
          </div>
        </div>
      )
    }
  }
}

export class Tabs extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  private previousTitleIndex: number
  private dom: Element

  private activeIndex: number

  /**
   * 存储 key => index
   */
  private keyMapIndex = new Map<number | string, number>()

  public componentWillMount() {
    this.state = {
      activeKey: this.props.activeKey || this.props.defaultActiveKey,
    }
    this.previousTitleIndex = -1
  }

  public componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this)

    let activeIndex = -1
    React.Children.map(this.props.children, (item: any, index: number) => {
      if (this.state.activeKey === item.props.activeKey) {
        activeIndex = index
      }
    })

    this.setActive(this.state.activeKey, activeIndex)

    this.activeIndex = activeIndex
  }

  public componentWillReceiveProps(nextProps: typings.Props) {
    if ("activeKey" in nextProps && nextProps.activeKey !== null) {
      this.setActive(nextProps.activeKey, this.keyMapIndex.get(nextProps.activeKey))
    }
  }

  public setActive = (value: string | number, index: number) => {
    // tab标题容器
    const titleContainer = this.dom.getElementsByClassName("title-container")[0]
    const titleContainerRect = titleContainer.getBoundingClientRect()

    // 当前选择标题元素
    const titleItem = this.dom.getElementsByClassName(`title-item-${index}`)[0]
    const titleItemRect = titleItem.getBoundingClientRect()

    // 当前标题元素距离容器的做边距
    const currentLeft = titleItemRect.left - titleContainerRect.left

    this.setState({
      activeKey: value,
      isForward: index > this.previousTitleIndex,
      moveBarStyle: {
        left: currentLeft,
        right: titleContainerRect.width - currentLeft - titleItemRect.width,
      },
    })

    this.previousTitleIndex = index
  }

  public handleTitleClick = (value: string | number, index: number) => {
    // 只有非受控状态，才需要主动触发修改
    if (!this.props.activeKey) {
      this.setActive(value, index)
    }

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  public render() {
    const Title = React.Children.map(this.props.children, (item: any, index: number) => {
      const isActive = this.state.activeKey === item.props.activeKey

      const titleContent: React.ReactElement<any> = item.props.tab || item.props.tabRender(isActive)
      this.keyMapIndex.set(item.props.activeKey, index)

      return (
        <Styled.TitleItem
          onClick={this.handleTitleClick.bind(this, item.props.activeKey, index)}
          theme={{ active: isActive }}
          className={`title-item-${index}`}>{titleContent}</Styled.TitleItem>
      )
    })

    const Children = React
      .Children
      .map(this.props.children, (item: any) => {
        return React.cloneElement(item, {
          active: this.state.activeKey === item.props.activeKey,
        })
      })

    return (
      <Styled.Container>
        <Styled.TitleContainer>
          <Styled.MoveBar
            theme={{
              forward: this.state.isForward,
              backward: !this.state.isForward,
            }}
            style={this.state.moveBarStyle} /> {Title}
        </Styled.TitleContainer>
        <Styled.ContentContainer>
          {Children}
        </Styled.ContentContainer>
      </Styled.Container>
    )
  }
}
