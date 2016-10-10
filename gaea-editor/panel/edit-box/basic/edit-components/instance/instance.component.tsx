import * as React from 'react'
import * as typings from './instance.type'
import {observer, inject} from 'mobx-react'

import './instance.scss'

@inject('viewport', 'application') @observer
export default class EditComponentInstance extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo
    // 当前编辑组件的 class
    private ComponentClass: React.ComponentClass<FitGaea.ComponentProps>

    componentWillMount() {
        // 从 store 找到自己信息
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)

        // 获取当前要渲染的组件 class
        this.ComponentClass = this.props.application.getComponentByUniqueKey(this.componentInfo.props.gaeaUniqueKey)
    }

    handleApplyProps(props: any) {
        this.props.viewport.prepareWriteHistory()
        Object.keys(props).forEach(key=> {
            this.props.viewport.updateComponentValueWithNoHistory(key, props[key])
        })
        this.props.viewport.writeHistory()
    }

    render() {
        const componentInstances = this.props.editOption.instance.map((props, index)=> {
            const instanceElement = React.createElement(this.ComponentClass, props)
            return (
                <div key={index}
                     onClick={this.handleApplyProps.bind(this, props)}
                     className="instance-item">{instanceElement}</div>
            )
        })

        return (
            <div className="_namespace">
                {componentInstances}
            </div>
        )
    }
}