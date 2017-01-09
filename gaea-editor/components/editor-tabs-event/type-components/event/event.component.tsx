import * as React from 'react'
import * as typings from './event.type'
import { observer, inject } from 'mobx-react'

import AutoComplete from 'nt-web-auto-complete'

import * as EditorManager from '../../../../../gaea-editor-manager/gaea-editor-manager'

import './event.scss'

@inject('ViewportStore', 'EditorEventAction') @observer
export default class Event extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    handleChange(value: string) {
        //this.props.viewport.prepareWriteHistory()
        const eventData = this.props.isWeb ? 'gaeaEventData' : 'gaeaNativeEventData'
        this.props.EditorEventAction.updateEventData(this.props.ViewportStore.currentEditComponentMapUniqueKey, `${eventData}.${this.props.index}.typeData.listen`, value)
        //this.props.viewport.writeHistory()
    }

    render() {
        const customData = this.props.isWeb ? this.props.ViewportStore.currentEditComponentInfo.props.gaeaEventData[this.props.index].typeData as FitGaea.EventTriggerEvent : this.props.ViewportStore.currentEditComponentInfo.props.gaeaNativeEventData[this.props.index].typeData as FitGaea.EventTriggerEvent

        const datas = this.props.EditorEventAction.getEventListName().map(name => {
            return {
                text: name,
                value: name
            }
        })

        return (
            <AutoComplete value={customData.listen || ''}
                label="监听的事件名称"
                datas={datas}
                onChange={this.handleChange.bind(this)}
                onSelect={this.handleChange.bind(this)} />
        )
    }
}