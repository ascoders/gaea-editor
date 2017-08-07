import { Connect } from "dob-react"
import * as React from "react"
import * as ReactDOM from "react-dom";
import Icon from "../../components/icon/src"
import { Input } from "../../components/input/src"
import { Select } from "../../components/select/src"
import { TabPanel, Tabs } from "../../components/tabs/src"
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

    const folderSelectOptions = this.props.stores.ApplicationStore.pageFolderList
      .filter(pageKey => pageKey !== this.props.stores.ApplicationStore.currentEditPageKey)
      .map(pageKey => {
        const folderInfo = this.props.stores.ApplicationStore.pages.get(pageKey)
        return {
          key: pageKey,
          value: folderInfo.name || "未命名"
        }
      })

    return (
      <Styled.Container>
        <Styled.Title >
          <Styled.TitleLeftContainer>
            <span>
              {this.props.stores.ApplicationStore.currentCreatedPageKey ? "添加页面" : "编辑页面"}
            </span>
            {this.props.stores.ApplicationStore.currentCreatedPageKey !== this.props.stores.ApplicationStore.currentEditPageKey && !this.pageInfo.isHomePage && this.props.stores.ApplicationStore.currentViewportPageKey !== this.props.stores.ApplicationStore.currentEditPageKey &&
              < Styled.RemoveButtonContainer onClick={this.handleRemove}>
                <Icon type="trash" size={16} />
              </Styled.RemoveButtonContainer>
            }
          </Styled.TitleLeftContainer>
          <Styled.CloseContainer onClick={this.handleCloseRightBar}>
            <Icon type="close" size={15} />
          </Styled.CloseContainer>
        </Styled.Title>

        <Styled.FormTitle>名称</Styled.FormTitle>
        <Input disabled={this.pageInfo.isHomePage} value={this.pageInfo.name} onChange={this.handleChangeName} />

        <Styled.FormTitle>路径名</Styled.FormTitle>
        <Input disabled={this.pageInfo.isHomePage} value={this.pageInfo.path} onChange={this.handleChangePath} />

        <Styled.Description>
          页面路径：<Styled.RealPath>/{this.props.stores.ApplicationStore.currentEditPageRealPath}</Styled.RealPath>
        </Styled.Description>

        {!this.pageInfo.isHomePage &&
          [
            <Styled.FormTitle key="add-page-parent-title">父级文件夹</Styled.FormTitle>,
            <Select key="add-page-parent-select" options={folderSelectOptions} value={this.pageInfo.parentKey} onChange={this.handleSelectParentFolder} />
          ]
        }

        {this.props.stores.ApplicationStore.currentCreatedPageKey &&
          <Styled.Button onClick={this.handleCreate}>
            创建
          </Styled.Button>
        }
      </Styled.Container >
    )
  }

  private handleChangeName = (value: string) => {
    this.props.actions.ApplicationAction.changePageName(this.props.stores.ApplicationStore.currentEditPageKey, value)
  }

  private handleChangePath = (value: string) => {
    this.props.actions.ApplicationAction.changePagePath(this.props.stores.ApplicationStore.currentEditPageKey, value)
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

  private handleRemove = () => {
    this.props.actions.ApplicationAction.removePage(this.props.stores.ApplicationStore.currentEditPageKey)
    this.props.actions.ApplicationAction.setRightTool(null)
  }

  private handleSelectParentFolder = (pageKey: string) => {
    this.props.actions.ApplicationAction.changePageParentKey(this.props.stores.ApplicationStore.currentEditPageKey, pageKey)
  }
}

export default {
  position: "toolContainerRightAddPage",
  class: PageAddPage
}
