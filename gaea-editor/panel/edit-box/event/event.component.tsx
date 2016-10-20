import * as React from 'react'
import * as typings from './event.type'
import {observer, inject} from 'mobx-react'

import {Button} from '../../../../../../web-common/button/index'
import {Select} from '../../../../../../web-common/select/index'

import JumpUrlEvent from './event-components/jump-url/jump-url.component'
import CallEvent from './event-components/call/call.component'
import EventEvent from './event-components/event/event.component'

import EventType from './type-components/event/event.component'

import './event.scss'

@inject('viewport', 'application') @observer
export default class EditBoxEvent extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    handleAddEvent() {
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.addEvent(this.props.viewport.currentEditComponentMapUniqueKey)
        this.props.viewport.writeHistory()
    }

    handleRemoveEvent(index: number) {
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.removeEvent(this.props.viewport.currentEditComponentMapUniqueKey, index)
        this.props.viewport.writeHistory()
    }

    /**
     * 修改事件触发条件
     */
    handleChangeEventTriggerCondition(dataIndex: number, typeIndex: string) {
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.updateEventTriggerCondition(this.props.viewport.currentEditComponentMapUniqueKey, dataIndex, typeIndex)
        this.props.viewport.writeHistory()
    }

    /**
     * 修改事件触发动作
     */
    handleChangeEventAction(dataIndex: number, eventIndex: string) {
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.updateEventAction(this.props.viewport.currentEditComponentMapUniqueKey, dataIndex, eventIndex)
        this.props.viewport.writeHistory()
    }

    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)

        if (!this.componentInfo.props.gaeaEvent) {
            return null
        }

        const typeOptions = this.componentInfo.props.gaeaEvent.types.map((type, index)=> {
            return {
                key: index.toString(),
                value: type.name
            }
        })

        typeOptions.unshift({
            key: 'listen',
            value: '监听事件'
        })

        typeOptions.unshift({
            key: 'init',
            value: '初始化'
        })

        const eventOptions = this.componentInfo.props.gaeaEvent.events.map((event, index)=> {
            return {
                key: index.toString(),
                value: event.name
            }
        })

        eventOptions.unshift({
            key: 'emit',
            value: '触发事件'
        })

        eventOptions.unshift({
            key: 'none',
            value: '无'
        })

        // 循环出事件列表
        const Events = this.componentInfo.props.gaeaEventData.map((data, index)=> {
            let TypeEditor: React.ReactElement<any>
            switch (data.type) {
                case 'listen':
                    TypeEditor = (
                        <EventType index={index}/>
                    )
                    break
            }

            let ActionEditor: React.ReactElement<any>
            switch (data.event) {
                case 'jumpUrl':
                    ActionEditor = (
                        <JumpUrlEvent index={index}/>
                    )
                    break
                case 'call':
                    ActionEditor = (
                        <CallEvent index={index}/>
                    )
                    break
                case 'emit':
                    ActionEditor = (
                        <EventEvent index={index}/>
                    )
                    break
            }

            return (
                <div key={index}
                     className="event-item-container">
                    <div className="event-choose-container">
                        <div className="event-label">
                            <Select label="触发条件"
                                    value={data.typeIndex>-1?data.typeIndex.toString():data.type}
                                    onChange={this.handleChangeEventTriggerCondition.bind(this, index)}
                                    options={typeOptions}/>
                        </div>
                        <div className="event-effect">
                            <Select label="动作"
                                    value={data.eventIndex>-1?data.eventIndex.toString():data.event}
                                    onChange={this.handleChangeEventAction.bind(this,index)}
                                    options={eventOptions}/>
                        </div>
                        <div className="close-container"
                             onClick={this.handleRemoveEvent.bind(this, index)}>
                            <i className="fa fa-close"/>
                        </div>
                    </div>

                    <div className="event-editor-container">
                        {TypeEditor}
                        {ActionEditor}
                    </div>
                </div>
            )
        })

        return (
            <div className="_namespace">
                {this.componentInfo.props.gaeaEventData.length > 0 &&
                <div className="event-container">
                    {Events}
                </div>
                }

                <Button className="new-event-button"
                        onClick={this.handleAddEvent.bind(this)}>新建事件</Button>
            </div>
        )
    }
}