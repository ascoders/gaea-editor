import * as React from 'react'
import * as typings from './event.type'
import {observer, inject} from 'mobx-react'

import {Button} from '../../../../../../web-common/button/index'
import {Select} from '../../../../../../web-common/select/index'

import './event.scss'

@inject('viewport', 'application') @observer
export default class EditBoxEvent extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)

        if (!this.componentInfo.props.gaeaEvent) {
            return null
        }

        const typeOptions = this.componentInfo.props.gaeaEvent.types.map(type=> {
            return {
                key: type.type,
                value: type.name
            }
        })

        const eventOptions = this.componentInfo.props.gaeaEvent.events.map(event=> {
            return {
                key: event.event,
                value: event.name
            }
        })

        eventOptions.unshift({
            key: 'none',
            value: '无'
        })

        return (
            <div className="_namespace">
                <div className="event-container">
                    <div className="event-item-container">
                        <div className="event-label">
                            <Select label="触发条件"
                                    defaultValue="init"
                                    options={typeOptions}/>
                        </div>
                        <div className="event-effect">
                            <Select label="动作"
                                    defaultValue="none"
                                    options={eventOptions}/>
                        </div>
                    </div>
                </div>

                <Button className="new-event-button">新建事件</Button>
            </div>
        )
    }
}