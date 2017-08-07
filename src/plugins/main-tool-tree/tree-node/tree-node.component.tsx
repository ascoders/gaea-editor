import { Connect } from "dob-react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { TreeNode } from "../../../components/tree/src"
import * as Styled from "./tree-node.style"
import * as typings from "./tree-node.type"

class CustomTreeNode extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props()
  public state = new typings.State()

  /**
   * 当前绑定节点信息
   */
  public instanceInfo: InstanceInfo

  /**
   * 组件的类
   */
  private componentClass: React.ComponentClass<IGaeaProps>

  /**
   * 记录组件生命值，只要大于 0，说明没有被销毁
   */
  private health = 1

  /**
   * 当前实例设置信息
   */
  private setting: IGaeaSetting

  public componentWillMount() {
    // 从 store 找到自己信息
    this.instanceInfo = this.props.stores.ViewportStore.instances.get(this.props.instanceKey)
    this.componentClass = this.props.actions.ApplicationAction.getComponentClassByKey(this.instanceInfo.gaeaKey)
    this.setting = this.props.actions.ApplicationAction.getSettingByInstance(this.instanceInfo)
  }

  public componentDidMount() {
    this.health++

    this.props.actions.TreeAction.addTreeDom(this.props.instanceKey, ReactDOM.findDOMNode(this) as HTMLElement)

    // 如果自己是布局元素, 给子元素绑定 sortable
    if (this.setting.isContainer) {
      // 添加可排序拖拽
      this.props.actions.ViewportAction.registerInnerDrag(this.props.instanceKey, ReactDOM.findDOMNode(this).getElementsByClassName("childs-container")[0] as HTMLElement, "gaea-tree-container")
    }
  }

  public componentWillUnmount() {
    this.health--

    // 因为一个组件跨层级拖动，会先生成再销毁，这时组件没有死亡，所以不要把监听移除
    if (this.health === 0) {
      // 在 dom 列表中移除
      this.props.actions.TreeAction.removeTreeDom(this.props.instanceKey)
    }
  }

  /**
   * 更新此元素的 dom 信息
   */
  public updateDom = () => {
    this.props.actions.TreeAction.addTreeDom(this.props.instanceKey, ReactDOM.findDOMNode(this) as HTMLElement)
  }

  public handleRenderTitle = () => {
    // TODO: 如果有事件，显示出标识
    const eventTag: React.ReactElement<any> = null
    // if (this.instanceInfo.props.gaeaEventData && this.instanceInfo.props.gaeaEventData.length > 0 || (this.instanceInfo.props.gaeaNativeEventData && this.instanceInfo.props.gaeaNativeEventData.length)) {
    //   eventTag = (
    //     <i className="event-container fa fa-bolt" />
    //   )
    // }

    return (
      <Styled.ItemContainer>
        <div className="title">
          {this.setting.name}
          {eventTag}
        </div>
      </Styled.ItemContainer>
    )
  }

  public handleMouseOver = (event: MouseEvent) => {
    event.stopPropagation()
    this.props.actions.ViewportAction.setCurrentHoverInstanceKey(this.props.instanceKey)
  }

  public handleClick = (event: MouseEvent) => {
    event.stopPropagation()
    this.props.actions.ViewportAction.setCurrentEditInstanceKey(this.props.instanceKey)
  }

  public render() {
    // 子元素
    let childs: Array<React.ReactElement<any>> = null

    if (this.setting.isContainer && this.instanceInfo.childs) {
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
    }

    return React.createElement(TreeNode, childProps, childs)
  }
}

const ConnectedCustomTreeNode = Connect(CustomTreeNode)
export default ConnectedCustomTreeNode
