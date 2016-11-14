import * as React from 'react'
import * as typings from './call.type'
import {observer, inject} from 'mobx-react'

import Input from '../../../../../../../web-common/input/index'

import * as EditorManager from '../../../../../gaea-editor-manager/gaea-editor-manager'
import Action from '../../action'

import './call.scss'

@inject('viewport') @observer
export default class Call extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    @EditorManager.lazyInject(Action) private eventAction: Action

    handleChange(value: string) {
        //this.props.viewport.prepareWriteHistory()
        const eventData = this.props.isWeb ? 'gaeaEventData' : 'gaeaNativeEventData'
        this.eventAction.updateEventData(this.props.viewport.currentEditComponentMapUniqueKey, `${eventData}.${this.props.index}.eventData.url`, value)
        // this.props.viewport.writeHistory()
    }

    render() {
        const customData = this.props.isWeb ? this.props.viewport.currentEditComponentInfo.props.gaeaEventData[this.props.index].eventData as FitGaea.EventActionCall : this.props.viewport.currentEditComponentInfo.props.gaeaNativeEventData[this.props.index].eventData as FitGaea.EventActionCall

        return (
            <div></div>
        )
    }
}