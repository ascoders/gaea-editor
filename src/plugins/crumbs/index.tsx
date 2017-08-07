import { Connect } from "dob-react"
import * as React from "react"
import * as Styled from "./index.style"
import * as typings from "./index.type"

@Connect
class Crumbs extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  public render() {
    let childs: Array<React.ReactElement<any>>

    if (this.props.stores.ViewportStore.currentEditInstanceKey) {
      // 递归寻找这个组件父元素
      childs = this.props.actions.ViewportAction.getInstancePath(this.props.stores.ViewportStore.currentEditInstanceKey).map((instanceKey, index) => {
        const instance = this.props.stores.ViewportStore.instances.get(instanceKey)
        const componentClass = this.props.actions.ApplicationAction.getComponentClassByKey(instance.gaeaKey)
        const setting = this.props.actions.ApplicationAction.getSettingByInstance(instance)

        return (
          <Styled.FooterItem onClick={this.handleClick.bind(this, instanceKey)}
            onMouseOver={this.handleHover.bind(this, instanceKey)}
            key={index}>
            {setting.name}

            <Styled.rightIconContainer>
              <Styled.rightIcon />
            </Styled.rightIconContainer>
          </Styled.FooterItem>
        )
      })
    }

    return (
      <Styled.Container>
        <Styled.AutoWidthContainer onMouseLeave={this.handleMouseLeave}>
          {childs}
        </Styled.AutoWidthContainer>
      </Styled.Container>
    )
  }

  private handleClick(instanceKey: string) {
    this.props.actions.ViewportAction.setCurrentEditInstanceKey(instanceKey)
  }

  private handleHover(instanceKey: string) {
    this.props.actions.ViewportAction.setCurrentHoverInstanceKey(instanceKey)
  }

  private handleMouseLeave = () => {
    this.props.actions.ViewportAction.setCurrentHoverInstanceKey(null)
  }
}

export default {
  position: "bottomBar",
  class: Crumbs
}
