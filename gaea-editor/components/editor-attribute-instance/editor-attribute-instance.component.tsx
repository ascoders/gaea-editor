import * as React from 'react'
import * as typings from './editor-attribute-instance.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { autoBindMethod } from 'nt-auto-bind'

import './editor-attribute-instance.scss'

@EditorManager.observer(['ViewportStore', 'ViewportAction', 'ApplicationAction'])
export default class EditorAttributeInstance extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributeInstance'

    // 当前编辑组件的 class
    private ComponentClass: React.ComponentClass<FitGaea.ComponentProps>

    componentWillMount() {
        // 获取当前要渲染的组件 class
        this.ComponentClass = this.props.ApplicationAction.getComponentClassByGaeaUniqueKey(this.props.ViewportStore.currentEditComponentInfo.props.gaeaUniqueKey)
    }

    handleApplyProps(props: any) {
        //this.props.viewport.prepareWriteHistory()
        Object.keys(props).forEach(key => {
            this.props.ViewportAction.updateCurrentEditComponentProps(key, props[key])
        })
        //this.props.viewport.writeHistory()
    }

    render() {
        if (this.props.ViewportStore.currentEditComponentMapUniqueKey === null) {
            return null
        }

        const componentInstances = this.props.ViewportStore.currentEditComponentInfo.props.gaeaEdit[this.props.index].instance.map((props, index) => {
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