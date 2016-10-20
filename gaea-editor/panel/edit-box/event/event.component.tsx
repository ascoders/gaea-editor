import * as React from 'react'
import * as typings from './event.type'
import * as _ from 'lodash'
import {observer, inject} from 'mobx-react'

import {Button, ButtonGroup} from '../../../../../../web-common/button/index'
import {Select} from '../../../../../../web-common/select/index'
import {Tooltip} from '../../../../../../web-common/tooltip/index'

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

    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)
        if (JSON.stringify(this.componentInfo.props.gaeaEventData) !== JSON.stringify(this.componentInfo.props.gaeaNativeEventData)) {
            this.setState({
                isExpend: true
            })
        }
    }

    handleAddEvent() {
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.addEvent(this.props.viewport.currentEditComponentMapUniqueKey, this.state.editType === 'web')
        this.props.viewport.writeHistory()
    }

    handleRemoveEvent(index: number) {
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.removeEvent(this.props.viewport.currentEditComponentMapUniqueKey, index, this.state.editType === 'web')
        this.props.viewport.writeHistory()
    }

    /**
     * 修改事件触发条件
     */
    handleChangeEventTriggerCondition(dataIndex: number, typeIndex: string) {
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.updateEventTriggerCondition(this.props.viewport.currentEditComponentMapUniqueKey, dataIndex, typeIndex, this.state.editType === 'web')
        this.props.viewport.writeHistory()
    }

    /**
     * 修改事件触发动作
     */
    handleChangeEventAction(dataIndex: number, eventIndex: string) {
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.updateEventAction(this.props.viewport.currentEditComponentMapUniqueKey, dataIndex, eventIndex, this.state.editType === 'web')
        this.props.viewport.writeHistory()
    }

    handleExpand() {
        this.setState({
            isExpend: true
        })
        // 同时复制一份配置给 native
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.copyEventToNative(this.props.viewport.currentEditComponentMapUniqueKey)
        this.props.viewport.writeHistory()
    }

    handleCompress() {
        this.setState({
            isExpend: false,
            editType: 'web'
        })
        // 删除 native 的事件配置
        this.props.viewport.prepareWriteHistory()
        this.props.viewport.removeNativeEvent(this.props.viewport.currentEditComponentMapUniqueKey)
        this.props.viewport.writeHistory()
    }

    changeEditType(type: string) {
        this.setState({
            editType: type
        })
    }

    /**
     * 判断是否能展开
     */
    canExpend() {
        if (!this.state.isExpend) {
            return true
        } else {
            return false
        }
    }

    /**
     * 判断是否能收起
     */
    canCompress() {
        if (this.state.isExpend) {
            return JSON.stringify(this.componentInfo.props.gaeaEventData) === JSON.stringify(this.componentInfo.props.gaeaNativeEventData)
        } else {
            return false
        }
    }

    /**
     * 生成事件配置结构
     */
    renderEventEditor(eventData: Array<FitGaea.EventData>) {
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

        return eventData.map((data, index)=> {
            let TypeEditor: React.ReactElement<any>
            switch (data.type) {
                case 'listen':
                    TypeEditor = (
                        <EventType index={index}
                                   isWeb={this.state.editType==='web'}/>
                    )
                    break
            }

            let ActionEditor: React.ReactElement<any>
            switch (data.event) {
                case 'jumpUrl':
                    ActionEditor = (
                        <JumpUrlEvent index={index}
                                      isWeb={this.state.editType==='web'}/>
                    )
                    break
                case 'call':
                    ActionEditor = (
                        <CallEvent index={index}
                                   isWeb={this.state.editType==='web'}/>
                    )
                    break
                case 'emit':
                    ActionEditor = (
                        <EventEvent index={index}
                                    isWeb={this.state.editType==='web'}/>
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
    }

    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)

        if (!this.componentInfo.props.gaeaEvent) {
            return null
        }

        const Events = this.state.editType === 'web' ? this.renderEventEditor(this.componentInfo.props.gaeaEventData) : this.renderEventEditor(this.componentInfo.props.gaeaNativeEventData)

        const notEmpty = this.state.editType === 'web' ? this.componentInfo.props.gaeaEventData.length > 0 : this.componentInfo.props.gaeaNativeEventData.length > 0

        return (
            <div className="_namespace">
                {notEmpty &&
                <div className="event-container">
                    {Events}
                </div>
                }

                <div className="bottom-operate-container">
                    <Button className="new-event-button"
                            onClick={this.handleAddEvent.bind(this)}>新建事件</Button>

                    {this.props.application.isReactNative &&
                    <div className="expend-button-container">
                        {this.canExpend() &&
                        <Tooltip title="分别配置 web 与 native 的事件">
                            <Button onClick={this.handleExpand.bind(this)}><i className="fa fa-expand"/></Button>
                        </Tooltip>
                        }

                        {this.state.isExpend &&
                        <ButtonGroup>
                            {this.canCompress() &&
                            <Tooltip title="统一编辑事件">
                                <Button onClick={this.handleCompress.bind(this)}><i className="fa fa-compress"/></Button>
                            </Tooltip>
                            }
                            <Tooltip title="只在web生效的事件">
                                <Button active={this.state.editType==='web'}
                                        onClick={this.changeEditType.bind(this, 'web')}>web</Button>
                            </Tooltip>
                            <Tooltip title="只在native生效的事件">
                                <Button active={this.state.editType==='native'}
                                        onClick={this.changeEditType.bind(this, 'native')}>native</Button>
                            </Tooltip>
                        </ButtonGroup>
                        }

                    </div>
                    }
                </div>
            </div>
        )
    }
}