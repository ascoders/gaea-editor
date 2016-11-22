import * as React from 'react'
import * as typings from './jump-url.type'
import { observer, inject } from 'mobx-react'

import Input from '../../../../../../../web-common/input/index'

import * as EditorManager from '../../../../../gaea-editor-manager/gaea-editor-manager'
import Action from '../../action'

import './jump-url.scss'

@inject('ViewportStore', 'EditorEventAction') @observer
export default class JumpUrl extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    @EditorManager.lazyInject(Action) private eventAction: Action

    handleChange(value: string) {
        //this.props.viewport.prepareWriteHistory()
        const eventData = this.props.isWeb ? 'gaeaEventData' : 'gaeaNativeEventData'
        this.eventAction.updateEventData(this.props.ViewportStore.currentEditComponentMapUniqueKey, `${eventData}.${this.props.index}.eventData.url`, value)
        //this.props.viewport.writeHistory()
    }

    render() {
        const customData = this.props.isWeb ? this.props.ViewportStore.currentEditComponentInfo.props.gaeaEventData[this.props.index].eventData as FitGaea.EventActionJumpUrl : this.props.ViewportStore.currentEditComponentInfo.props.gaeaNativeEventData[this.props.index].eventData as FitGaea.EventActionJumpUrl

        return (
            <Input label="跳转url地址"
                placeholder="例: http://www.baidu.com"
                value={customData.url}
                onChange={this.handleChange.bind(this)} />
        )
    }
}