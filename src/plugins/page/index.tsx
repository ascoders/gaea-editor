import { Connect } from "dob-react"
import * as React from "react"
import * as ReactDOM from "react-dom";
import Icon from "../../components/icon/src"
import { TabPanel, Tabs } from "../../components/tabs/src"
import { Tree } from "../../components/tree/src"
import PageAction from "./action"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"
import PageStore from "./store"
import TreeNode from "./tree-node/tree-node.component"

@Connect
class Page extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  public componentWillMount() {
    this.props.actions.ApplicationAction.RemoveCreatingPage()
  }

  public render() {
    const Pages = this.props.stores.ApplicationStore.rootPageKeys.map(pageKey => {
      return (
        <TreeNode key={pageKey} pageKey={pageKey} />
      )
    })

    return (
      <Styled.Container>
        <Styled.Title >
          <Styled.TitleLeftContainer>
            <div>配置页面</div>
            <Styled.CloseContainer onClick={this.handleCloseLeftBar}>
              <Icon type="close" size={15} />
            </Styled.CloseContainer>
          </Styled.TitleLeftContainer>
          <Styled.TitleRightContainer>
            <Styled.AddIcon onClick={this.handleAddFolder}>
              <Icon type="addFolder" />
            </Styled.AddIcon>
            <Styled.AddIcon onClick={this.handleAddPage}>
              <Icon type="addFile" size={17} />
            </Styled.AddIcon>
          </Styled.TitleRightContainer>
        </Styled.Title>

        {this.props.stores.ApplicationStore.pages.size > 0 &&
          <Tree>
            {Pages}
          </Tree>
        }

        {this.props.stores.ApplicationStore.pages.size === 1 &&
          <Styled.EmptyContainer>
            <Styled.EmptyTitle>
              添加新页面
          </Styled.EmptyTitle>
            <Styled.EmptyDescription>
              点击右上角按钮，创建文件夹或页面，应用默认拥有首页
          </Styled.EmptyDescription>
          </Styled.EmptyContainer>
        }
      </Styled.Container>
    )
  }

  private handleCloseLeftBar = () => {
    this.props.actions.ApplicationAction.RemoveCreatingPage()
    this.props.actions.ApplicationAction.setLeftTool(null)
    this.props.actions.ApplicationAction.setRightTool(null)
  }

  private handleAddFolder = () => {
    this.props.actions.ApplicationAction.RemoveCreatingPage()
    this.props.actions.ApplicationAction.createNewPage(true)
    this.props.actions.ApplicationAction.setRightTool("addFolder")
  }

  private handleAddPage = () => {
    this.props.actions.ApplicationAction.RemoveCreatingPage()
    this.props.actions.ApplicationAction.createNewPage(false)
    this.props.actions.ApplicationAction.setRightTool("addPage")
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
