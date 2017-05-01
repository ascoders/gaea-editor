import * as classNames from "classnames"
import { Connect } from "dynamic-react"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { StoreProps } from "../../../stores"
import { addClass, hasClass, removeClass } from "../../../utils/dom"
import * as Style from "./edit-helper.style"
import { Props, State } from "./edit-helper.type"

// 注入全局样式，辅助编辑器
Style.injectGlob()

/**
 * 一个辅助编辑状态的外壳，内部包裹实际渲染的组件
 */
class EditHelper extends React.Component<Props, State> {
    public static defaultProps = new Props()

    public state = new State()

    /**
     * 暴露内层组件实例
     */
    public wrappedInstance: React.ReactInstance

    /**
     * 组件的类
     */
    private componentClass: React.ComponentClass<IGaeaProps>

    /**
     * 组件实例的信息
     */
    private instanceInfo: InstanceInfo

    /**
     * 当前组件 dom 对象
     */
    private domInstance: HTMLElement

    public componentWillMount() {
        this.instanceInfo = this.props.stores.ViewportStore.instances.get(this.props.instanceKey)
        this.componentClass = this.props.actions.ApplicationAction.getComponentClassByKey(this.instanceInfo.gaeaKey)
    }

    public componentDidMount() {
        this.domInstance = ReactDOM.findDOMNode(this.wrappedInstance) as HTMLElement

        // 绑定监听
        this.domInstance.addEventListener("mouseover", this.handleMouseOver)
        this.domInstance.addEventListener("click", this.handleClick)

        this.setLayoutClassIfCanDragIn()

        addClass(this.domInstance, "gaea-draggable")

        // 设置此实例的 dom 节点
        this.props.actions.ViewportAction.setDomInstance(this.props.instanceKey, this.domInstance)

        // 如果自己是布局元素, 给子元素绑定 sortable
        if (this.componentClass.defaultProps.gaeaSetting.isContainer) {
            // 添加可排序拖拽
            this.props.actions.ViewportAction.registerInnerDrag(this.props.instanceKey, this.domInstance, {
                draggable: ".gaea-draggable"
            })
        }
    }

    public handleMouseOver = () => {
        //
    }

    public handleClick = () => {
        //
    }

    /**
     * 如果是布局容器，且不是最外层元素，添加 gaea-layout class，用于添加布局样式
     */
    public setLayoutClassIfCanDragIn = () => {
        if (this.componentClass.defaultProps.gaeaSetting.isContainer && this.instanceInfo.parentInstanceKey !== null) {
            addClass(this.domInstance, "gaea-container")
        }
    }

    public render() {
        // 子元素
        let childs: Array<React.ReactElement<any>> = null

        // 布局元素可以有子元素
        if (this.componentClass.defaultProps.gaeaSetting.isContainer) {
            childs = this.instanceInfo.childs.map(childKey => {
                return (
                    <ConnectedEditHelper key={childKey}
                        instanceKey={childKey} />
                )
            })
        }

        const wrapProps = {
            ...this.componentClass.defaultProps,
            ...this.instanceInfo.data.props,
            ref: (ref: React.ReactInstance) => {
                this.wrappedInstance = ref
            }
        }

        return React.createElement(this.componentClass, wrapProps, childs)
    }
}

const ConnectedEditHelper = Connect(EditHelper)
export default ConnectedEditHelper
