import { Connect } from "dynamic-react"
import * as React from "react"
import * as ReactDOM from "react-dom";
import Icon from "../../../components/icon/src"
import { TabPanel, Tabs } from "../../../components/tabs/src"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

@Connect
class PageAddFile extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  public render() {
    return (
      <Styled.Container>
        <Styled.Title >
          <div>添加页面</div>
          <Styled.CloseContainer onClick={this.handleCloseRightBar}>
            <Icon type="close" />
          </Styled.CloseContainer>
        </Styled.Title>
      </Styled.Container>
    )
  }

  private handleCloseRightBar = () => {
    this.props.actions.ApplicationAction.setRightTool(null)
  }
}

export default {
  position: "toolContainerRightAddFile",
  class: PageAddFile
}
