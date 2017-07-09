import * as classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { RenderTo } from "../../../render-to/src"
import * as Styled from "./option-group.style"
import * as typings from "./option-group.type"

export class OptionGroup extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  public render() {
    // 循环子元素
    let Children: React.ReactNode = this.props.children

    if (!this.props.ignoreChildren) {
      Children = React.Children.map(this.props.children, (item: React.ReactElement<any>, index: number) => {
        let active = false
        if (item.props.value === this.props.activeValue) {
          active = true
        }

        return React.cloneElement(item, {
          ...item.props,
          onClick: this.handleOptionClick.bind(this),
          key: index,
          active,
          setLabelValue: this.setLabelValue.bind(this),
          activeValue: this.props.activeValue,
          searchValue: this.props.searchValue
        })
      })
    }

    return (
      <Styled.Container>
        <Styled.GroupTitle>{this.props.label}</Styled.GroupTitle>
        {Children}
      </Styled.Container>
    )
  }

  private handleOptionClick = (value: string, label: string) => {
    if (typeof this.props.onClick === "function") {
      this.props.onClick(value, label)
    }
  }

  private setLabelValue = (labelValue: string) => {
    if (typeof this.props.setLabelValue === "function") {
      this.props.setLabelValue(labelValue)
    }
  }
}
