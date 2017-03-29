import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as classNames from 'classnames'
import { Connect } from 'dynamic-react'

import { StoreProps } from '../../../stores'
import { Props, State } from './edit-helper.type'
import * as Style from './edit-helper.style'

// 绑定数据的 EditHelper
const ObserveEditHelper = Connect(EditHelper)

/**
 * 一个辅助编辑状态的外壳，内部包裹实际渲染的组件
 */
@Connect
export default class EditHelper extends React.Component<Props, State> {
    static defaultProps = new Props()
    public state = new State()

    /**
     * 暴露内层组件实例
     */
    public wrappedInstance: React.ReactInstance

    /**
     * 组件的类
     */
    private ComponentClass: React.ComponentClass<any>

    /**
     * 组件实例的信息
     */
    private instanceInfo: InstanceInfo

    /**
     * 当前组件 dom 对象
     */
    private domInstance: HTMLElement

    componentWillMount() {
        // 从 store 找到自己信息
        this.instanceInfo = this.props.stores.ViewportStore.components.get(this.props.instanceKey)

        // 获取当前要渲染的组件 class
        this.ComponentClass = this.props.stores.ApplicationStore.componentClasses.get(this.instanceInfo.props.gaeaUniqueKey)
    }

    render() {
        return (
            <Style.Container>
                aaa
            </Style.Container>
        )
    }
}