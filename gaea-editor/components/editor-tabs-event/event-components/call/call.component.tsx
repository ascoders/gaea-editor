import * as React from 'react'
import * as typings from './call.type'
import {observer, inject} from 'mobx-react'

import Input from 'nt-web-input'
import Button from 'nt-web-button'

import * as EditorManager from '../../../../../gaea-editor-manager/gaea-editor-manager'
import Action from '../../action'

import './call.scss'

@inject('ViewportStore', 'EditorEventAction') @observer
export default class Call extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    handleChange(value: string) {
        //this.props.viewport.prepareWriteHistory()
        const eventData = this.props.isWeb ? 'gaeaEventData' : 'gaeaNativeEventData'
        this.props.EditorEventAction.updateEventData(this.props.ViewportStore.currentEditComponentMapUniqueKey, `${eventData}.${this.props.index}.eventData.functionName`, value)
        // this.props.viewport.writeHistory()
    }

    render() {
        const customData = this.props.isWeb ? this.props.ViewportStore.currentEditComponentInfo.props.gaeaEventData[this.props.index].eventData as FitGaea.EventActionCall : this.props.ViewportStore.currentEditComponentInfo.props.gaeaNativeEventData[this.props.index].eventData as FitGaea.EventActionCall

        return (
            <div>
                <Input style={{marginBottom:8}}
                       value={customData.functionName}
                       onChange={this.handleChange.bind(this)}
                       label="自定义命令"/>

                <Button onClick={this.handleChange.bind(this, 'back')}
                        active={customData.functionName==='back'}>回退</Button>
                <Button style={{marginLeft:5}}
                        onClick={this.handleChange.bind(this, 'close')}
                        active={customData.functionName==='close'}>关闭</Button>
            </div>
        )
    }
}