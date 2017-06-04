import * as classNames from "classnames"
import * as _ from "lodash"
import * as React from "react"
import { RenderTo } from "../../../render-to/src"
import * as Styled from "./option.style"
import * as typings from "./option.type"

// Styled.global()

const reg = (input: string) => {
  return new RegExp(input, "g")
}

export class Option extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  public componentWillMount() {
    // 如果当前value和select的value相同,传递给父级
    if (this.props.value === this.props.activeValue) {
      this.props.setLabelValue(this.props.value, this.props.children.toString() as string)
    }
  }

  public render() {
    if (this.props.searchValue) {
      const regex = reg(this.props.searchValue)
      if (regex.test(this.props.children.toString())) {
        const matchedString = _.escape(this.props.children.toString()).replace(regex, "<span class=\"gaea-component-select-option-active\">" + this.props.searchValue + "</span>")
        return (
          <li onClick={this.handleClick.bind(this)}
            dangerouslySetInnerHTML={{ __html: matchedString }} />
        )
      } else {
        return null
      }
    }

    return (
      <Styled.Container theme={{ disabled: this.props.disabled, active: this.props.active }} onClick={this.handleClick.bind(this)}>{this.props.children}</Styled.Container>
    )
  }

  private handleClick = () => {
    if (this.props.disabled) {
      return
    }
    this.props.onClick(this.props.value, this.props.children.toString() as string, this.props.optChildren, this.props.zIndex)
  }
}
