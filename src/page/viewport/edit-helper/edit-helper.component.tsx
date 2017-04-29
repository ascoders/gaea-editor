import * as classNames from "classnames"
import { Connect } from "dynamic-react"
import * as React from "react"
import * as ReactDOM from "react-dom"

import { StoreProps } from "../../../stores"
import * as Style from "./edit-helper.style"
import { Props, State } from "./edit-helper.type"

/**
 * 一个辅助编辑状态的外壳，内部包裹实际渲染的组件
 */
@Connect
export default class EditHelper extends React.Component<Props, State> {
    public static defaultProps = new Props()

    // 绑定数据的 EditHelper
    public static ObserveEditHelper = () => Connect(EditHelper)

    public state = new State()

    /**
     * 暴露内层组件实例
     */
    public wrappedInstance: React.ReactInstance

    /**
     * 组件的类
     */
    private componentClass: React.ComponentClass<any>

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

    public render() {
        return (
            <Style.Container>
                {React.createElement(this.componentClass)}
            </Style.Container>
        )
    }
}
