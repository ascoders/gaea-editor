import * as classNames from "classnames"
import * as React from "react"
import { RenderTo } from "../../../render-to/src"
import * as Styled from "./modal.style"
import * as typings from "./modal.type"

export class Modal extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  public render() {
    if (!this.props.show) {
      return null
    }

    return (
      <RenderTo>
        <Styled.Container>
          <Styled.Block>
            {this.props.children}
          </Styled.Block>
        </Styled.Container>
      </RenderTo>
    )
  }
}
