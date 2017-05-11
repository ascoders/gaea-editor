import { Connect } from "dynamic-react"
import * as React from "react"
import * as ReactDOM from "react-dom";
import Icon from "../../../components/icon/src"
import { TabPanel, Tabs } from "../../../components/tabs/src"
import { Tree } from "../../../components/tree/src"
import PageAction from "./action"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"
import PageStore from "./store"

@Connect
class Page extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  public render() {
    return (
      <Styled.Container>
        <Styled.Title >
          <Styled.TitleLeftContainer>
            <div>配置页面</div>
            <Styled.CloseContainer onClick={this.handleCloseLeftBar}>
              <Icon type="close" />
            </Styled.CloseContainer>
          </Styled.TitleLeftContainer>
          <Styled.TitleRightContainer>
            <Styled.AddIcon onClick={this.handleAddFolder}>
              <Icon type="addFolder" />
            </Styled.AddIcon>
            <Styled.AddIcon onClick={this.handleAddFile}>
              <Icon type="addFile" size={17} />
            </Styled.AddIcon>
          </Styled.TitleRightContainer>
        </Styled.Title>

        <Styled.EmptyContainer>
          <Styled.EmptyTitle>
            添加新页面
          </Styled.EmptyTitle>
          <Styled.EmptyDescription>
            点击右上角按钮，创建文件夹或页面
          </Styled.EmptyDescription>
        </Styled.EmptyContainer>

        <Tree></Tree>
      </Styled.Container>
    )
  }

  private handleCloseLeftBar = () => {
    this.props.actions.ApplicationAction.setLeftTool(null)
    this.props.actions.ApplicationAction.setRightTool(null)
  }

  private handleAddFolder = () => {
    this.props.actions.ApplicationAction.setRightTool("addFolder")
  }

  private handleAddFile = () => {
    this.props.actions.ApplicationAction.setRightTool("addFile")
  }
}

export default {
  position: "toolContainerLeftPage",
  class: Page,
  actions: {
    PageAction
  },
  stores: {
    PageStore
  }
}
