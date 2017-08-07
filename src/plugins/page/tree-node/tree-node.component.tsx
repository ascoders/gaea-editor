import { Connect } from "dob-react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import Icon from "../../../components/icon/src"
import { TreeNode } from "../../../components/tree/src"
import * as Styled from "./tree-node.style"
import * as typings from "./tree-node.type"

class CustomTreeNode extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  private pageInfo: IPage

  public render() {
    this.pageInfo = this.props.stores.ApplicationStore.pages.get(this.props.pageKey)

    if (!this.pageInfo) {
      return null
    }

    // 子元素
    let childs: Array<React.ReactElement<any>> = null

    if (this.pageInfo.type === "folder") {
      childs = this.pageInfo.childs.map(childKey => {
        return (
          <ConnectedTreeNode key={childKey}
            pageKey={childKey} />
        )
      })
    }

    const pageName = this.pageInfo.name
    const currentCreatedPageKey = this.props.stores.ApplicationStore.currentCreatedPageKey
    const currentViewportPageKey = this.props.stores.ApplicationStore.currentViewportPageKey
    const currentEditPageKey = this.props.stores.ApplicationStore.currentEditPageKey

    const childProps = {
      render: () => {
        return (
          <Styled.Content theme={{ editted: currentEditPageKey === this.props.pageKey }}>
            <Styled.Title theme={{ isHome: this.pageInfo.isHomePage }}>
              {pageName === "" ?
                <Styled.UnNamed>&lt;未命名&gt;</Styled.UnNamed> : pageName}
            </Styled.Title>

            <Styled.RightContainer>
              {currentViewportPageKey === this.props.pageKey &&
                <Styled.InUseTag>
                  使用中
                </Styled.InUseTag>
              }
              {currentCreatedPageKey !== this.props.pageKey &&
                <Styled.Setting onClick={this.handleEdit}>
                  <Icon type="setting" size={15} />
                </Styled.Setting>
              }
            </Styled.RightContainer>
          </Styled.Content>
        )
      },
      defaultExpendAll: true,
      toggleByArrow: true,
      onClick: this.handleClick
    }

    return (
      <Styled.Container>
        {React.createElement(TreeNode, childProps, childs)}
      </Styled.Container>
    )
  }

  private handleClick = () => {
    // 当前正在创建，未确定的页面不能设置为当前编辑
    if (this.props.pageKey === this.props.stores.ApplicationStore.currentCreatedPageKey) {
      return
    }

    // 是当前使用的页面，什么都不发生
    if (this.props.pageKey === this.props.stores.ApplicationStore.currentViewportPageKey) {
      return
    }

    if (this.pageInfo.type === "page") {
      // 更新前，将当前页面内容保存
      const fullInformation = this.props.stores.ViewportStore.currentFullInformation
      this.props.stores.ApplicationStore.pageInstances.set(this.props.stores.ApplicationStore.currentViewportPageKey, fullInformation)

      // 重置应用
      this.props.actions.ApplicationAction.resetApplication()
      // 自己的窗口不要关
      this.props.actions.ApplicationAction.setLeftTool("page")

      // 设置 viewport
      if (this.props.stores.ApplicationStore.pageInstances.has(this.props.pageKey)) {
        this.props.actions.ViewportAction.resetViewport(this.props.stores.ApplicationStore.pageInstances.get(this.props.pageKey))
      } else {
        // 清空当前视图
        this.props.actions.ViewportAction.clearViewport()
        // 创建一个初始视图
        this.props.actions.ViewportAction.initViewport()
      }

      // 设置当前 viewport 使用的页面
      this.props.actions.ApplicationAction.changeCurrentViewportPageKey(this.props.pageKey)
    }
  }

  private handleEdit = (event: React.FormEvent<HTMLDivElement>) => {
    event.stopPropagation()

    this.props.actions.ApplicationAction.RemoveCreatingPage()
    this.props.actions.ApplicationAction.setCurrentEditPageKey(this.props.pageKey)
    const pageInfo = this.props.stores.ApplicationStore.pages.get(this.props.pageKey)
    if (pageInfo.type === "folder") {
      this.props.actions.ApplicationAction.setRightTool("addFolder")
    } else {
      this.props.actions.ApplicationAction.setRightTool("addPage")
    }
  }
}

const ConnectedTreeNode = Connect(CustomTreeNode)
export default ConnectedTreeNode
