import { Connect } from "dynamic-react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { TreeNode } from "../../../../components/tree/src"
import * as Styled from "./tree-node.style"
import * as typings from "./tree-node.type"

@Connect
export default class CustomTreeNode extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  public render() {
    // 渲染后的结果
    let resultElement: React.ReactElement<any>
    // 子元素
    const childs: Array<React.ReactElement<any>> = null

    /*if (this.componentClass.defaultProps.gaeaSetting.isContainer && this.instanceInfo.childs) {
      childs = this.instanceInfo.childs.map(childKey => {
        return (
          <ConnectedCustomTreeNode key={childKey}
            instanceKey={childKey} />
        )
      })
    }

    const childProps = {
      render: this.handleRenderTitle,
      defaultExpendAll: true,
      toggleByArrow: true,
      onMouseOver: this.handleMouseOver,
      onClick: this.handleClick
    }*/

    // 执行 render 以绑定数据
    // this.handleRenderTitle()

    resultElement = React.createElement(TreeNode, {}, childs)

    return resultElement
  }
}
