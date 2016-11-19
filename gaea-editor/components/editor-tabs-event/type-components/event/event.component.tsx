import * as React from 'react'
import * as typings from './event.type'
import {observer, inject} from 'mobx-react'

import AutoComplete from '../../../../../../../web-common/auto-complete/index'

import * as EditorManager from '../../../../../gaea-editor-manager/gaea-editor-manager'
import Action from '../../action'

import './event.scss'

@inject('viewport') @observer
export default class Event extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    @EditorManager.lazyInject(Action) private eventAction: Action

    handleChange(value: string) {
        //this.props.viewport.prepareWriteHistory()
        const eventData = this.props.isWeb ? 'gaeaEventData' : 'gaeaNativeEventData'
        this.eventAction.updateEventData(this.props.viewport.currentEditComponentMapUniqueKey, `${eventData}.${this.props.index}.typeData.listen`, value)
        //this.props.viewport.writeHistory()
    }

    render() {
        const customData = this.props.isWeb ? this.props.viewport.currentEditComponentInfo.props.gaeaEventData[this.props.index].typeData as FitGaea.EventTriggerEvent : this.props.viewport.currentEditComponentInfo.props.gaeaNativeEventData[this.props.index].typeData as FitGaea.EventTriggerEvent

        const datas = this.eventAction.getEventListName().map(name=> {
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
                          onSelect={this.handleChange.bind(this)}/>
        )
    }
}