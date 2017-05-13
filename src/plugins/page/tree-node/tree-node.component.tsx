import { Connect } from "dynamic-react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import Icon from "../../../../components/icon/src"
import { TreeNode } from "../../../../components/tree/src"
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

    // 渲染后的结果
    let resultElement: React.ReactElement<any>
    // 子元素
    let childs: Array<React.ReactElement<any>> = null

    if (this.pageInfo.type === "folder") {
      childs = this.pageInfo.childs.map(childKey => {
        return (
          <ConnectedTreeNode key={childKey}
            instanceKey={childKey} />
        )
      })
    }

    const pageName = this.pageInfo.name
    const currentCreatedPageKey = this.props.stores.ApplicationStore.currentCreatedPageKey

    const childProps = {
      render: () => {
        return (
          <Styled.Content>
            <Styled.Title>
              {pageName === "" ?
                <Styled.UnNamed>&lt;未命名&gt;</Styled.UnNamed> : pageName}
            </Styled.Title>
            {currentCreatedPageKey !== this.props.pageKey &&
              <Styled.Setting onClick={this.handleEdit}>
                <Icon type="setting" size={15} />
              </Styled.Setting>
            }
          </Styled.Content>
        )
      },
      defaultExpendAll: true,
      toggleByArrow: true,
      onClick: this.handleClick
    }

    resultElement = React.createElement(TreeNode, childProps, childs)

    return (
      <Styled.Container>{resultElement}</Styled.Container>
    )
  }

  private handleClick = () => {
    // console.log(123)
  }

  private handleEdit = () => {
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
