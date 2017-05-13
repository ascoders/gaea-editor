import { Connect } from "dynamic-react"
import * as React from "react"
import * as ReactDOM from "react-dom";
import Icon from "../../../components/icon/src"
import { Select } from "../../../components/select/src"
import { TabPanel, Tabs } from "../../../components/tabs/src"
import * as Styled from "./index.style"
import { Props, State } from "./index.type"

@Connect
class PageAddPage extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  private pageInfo: IPage = null

  public render() {
    this.pageInfo = this.props.stores.ApplicationStore.currentEditPage

    if (!this.pageInfo) {
      return
    }

    return (
      <Styled.Container>
        <Styled.Title >
          <div>{this.props.stores.ApplicationStore.currentCreatedPageKey ? "添加页面" : "编辑页面"}</div>
          <Styled.CloseContainer onClick={this.handleCloseRightBar}>
            <Icon type="close" />
          </Styled.CloseContainer>
        </Styled.Title>

        <Styled.FormTitle>名称</Styled.FormTitle>
        <input value={this.pageInfo.name} onChange={this.handleChangeName} />

        <Styled.FormTitle>路径名</Styled.FormTitle>
        <input value={this.pageInfo.path} onChange={this.handleChangePath} />
        <Styled.Description>

        </Styled.Description>

        <Styled.FormTitle>父级文件夹</Styled.FormTitle>

        {this.props.stores.ApplicationStore.currentCreatedPageKey &&
          <Styled.Button onClick={this.handleCreate}>
            创建
          </Styled.Button>
        }
      </Styled.Container>
    )
  }

  private handleChangeName = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.actions.ApplicationAction.changePageName(this.props.stores.ApplicationStore.currentEditPageKey, event.currentTarget.value as string)
  }

  private handleChangePath = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.actions.ApplicationAction.changePagePath(this.props.stores.ApplicationStore.currentEditPageKey, event.currentTarget.value as string)
  }

  private handleCloseRightBar = () => {
    // 如果此时有正在编辑的页面，直接删除
    this.props.actions.ApplicationAction.RemoveCreatingPage()

    this.props.actions.ApplicationAction.setRightTool(null)
  }

  private handleCreate = () => {
    this.props.actions.ApplicationAction.confirmCreatePage()
    this.props.actions.ApplicationAction.setRightTool(null)
  }
}

export default {
  position: "toolContainerRightAddPage",
  class: PageAddPage
}
