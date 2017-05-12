import { Connect } from "dynamic-react"
import * as React from "react"
import * as ReactDOM from "react-dom";
import Icon from "../../../components/icon/src"
import { TabPanel, Tabs } from "../../../components/tabs/src"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

@Connect
class DragMenu extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  private listContainer: React.ReactInstance

  public componentDidMount() {
    this.props.actions.ViewportAction.registerOuterDrag(ReactDOM.findDOMNode(this.listContainer) as HTMLElement)
  }

  public render() {
    return (
      <Styled.Container>
        <Styled.Title >
          <div>添加组件</div>
          <Styled.CloseContainer onClick={this.handleCloseLeftBar}>
            <Icon type="close" />
          </Styled.CloseContainer>
        </Styled.Title>

        <div ref={ref => this.listContainer = ref}>
          {this.getList()}
        </div>

        {this.props.actions.ApplicationAction.loadingPluginByPosition("toolContainerDragMenuList")}
      </Styled.Container>
    )
  }

  private getList = () => {
    return Array.from(this.props.stores.ApplicationStore.componentClasses).map(([key, componentClass], index) => {
      return (
        <Styled.Component
          key={index}
          data-gaea-key={componentClass.defaultProps.gaeaSetting.key}
        >{componentClass.defaultProps.gaeaSetting.name}</Styled.Component>
      )
    })
  }

  private handleCloseLeftBar = () => {
    this.props.actions.ApplicationAction.setLeftTool(null)
    this.props.actions.ApplicationAction.setRightTool(null)
  }
}

export default {
  position: "toolContainerLeftDragMenu",
  class: DragMenu
}
