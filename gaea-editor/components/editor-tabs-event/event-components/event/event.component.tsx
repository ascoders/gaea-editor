import * as React from 'react'
import * as typings from './event.type'
import { observer, inject } from 'mobx-react'

import AutoComplete from '../../../../../../../web-common/auto-complete/index'

import * as EditorManager from '../../../../../gaea-editor-manager/gaea-editor-manager'
import Action from '../../action'

import './event.scss'

@inject('ViewportStore', 'EditorEventAction') @observer
export default class Event extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    handleChange(value: string) {
        //this.props.viewport.prepareWriteHistory()
        const eventData = this.props.isWeb ? 'gaeaEventData' : 'gaeaNativeEventData'
        this.props.EditorEventAction.updateEventData(this.props.ViewportStore.currentEditComponentMapUniqueKey, `${eventData}.${this.props.index}.eventData.emit`, value)
        //this.props.viewport.writeHistory()
    }

    render() {
        const customData = this.props.isWeb ? this.props.ViewportStore.currentEditComponentInfo.props.gaeaEventData[this.props.index].eventData as FitGaea.EventActionEvent : this.props.ViewportStore.currentEditComponentInfo.props.gaeaNativeEventData[this.props.index].eventData as FitGaea.EventActionEvent

        return (
            <AutoComplete value={customData.emit || ''}
                label="触发的事件名称"
                onChange={this.handleChange.bind(this)}
                onSelect={this.handleChange.bind(this)} />
        )
    }
}