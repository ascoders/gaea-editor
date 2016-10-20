import * as React from 'react'
import * as typings from './event.type'
import {observer, inject} from 'mobx-react'

import AutoComplete from '../../../../../../../../web-common/auto-complete/index'

import './event.scss'

@inject('viewport') @observer
export default class Event extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    handleChange(value: string) {
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.updateEventData(this.props.viewport.currentEditComponentMapUniqueKey, `gaeaEventData.${this.props.index}.typeData.listen`, value)
        this.props.viewport.writeHistory()
    }

    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)

        const customData = this.componentInfo.props.gaeaEventData[this.props.index].typeData as FitGaea.EventTriggerEvent

        return (
            <AutoComplete value={customData.listen || ''}
                          label="监听的事件名称"
                          onChange={this.handleChange.bind(this)}
                          onSelect={this.handleChange.bind(this)}/>
        )
    }
}