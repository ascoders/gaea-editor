import * as React from 'react'
import * as typings from './editor-tabs-event.type'
import * as _ from 'lodash'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { Button, ButtonGroup } from '../../../../../web-common/button/index'
import { Select } from '../../../../../web-common/select/index'
import { Tooltip } from '../../../../../web-common/tooltip/index'

import JumpUrlEvent from './event-components/jump-url/jump-url.component'
import CallEvent from './event-components/call/call.component'
import EventEvent from './event-components/event/event.component'
import UpdatePropsEvent from './event-components/update-props/update-props.component'

import EventType from './type-components/event/event.component'

import Action from './action'
import Store from './store'

import './editor-tabs-event.scss'

@EditorManager.observer(['ViewportStore', 'EditorEventStore', 'EditorEventAction', 'ApplicationStore'])
export default class EditorTabsEvent extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorEvent'
    static Action = Action
    static Store = Store

    componentWillMount() {
        if (JSON.stringify(this.props.ViewportStore.currentEditComponentInfo.props.gaeaEventData) !== JSON.stringify(this.props.ViewportStore.currentEditComponentInfo.props.gaeaNativeEventData)) {
            this.setState({
                isExpend: true
            })
        }
    }

    handleAddEvent() {
        //this.props.viewport.prepareWriteHistory()
        this.props.EditorEventAction.addEvent(this.props.ViewportStore.currentEditComponentMapUniqueKey, this.state.editType === 'web')
        //this.props.viewport.writeHistory()
    }

    handleRemoveEvent(index: number) {
        //this.props.viewport.prepareWriteHistory()
        this.props.EditorEventAction.removeEvent(this.props.ViewportStore.currentEditComponentMapUniqueKey, index, this.state.editType === 'web')
        //this.props.viewport.writeHistory()
    }

    /**
     * 修改事件触发条件
     */
    handleChangeEventTriggerCondition(dataIndex: number, typeIndex: string) {
        //this.props.viewport.prepareWriteHistory()
        this.props.EditorEventAction.updateEventTriggerCondition(this.props.ViewportStore.currentEditComponentMapUniqueKey, dataIndex, typeIndex, this.state.editType === 'web')
        //this.props.viewport.writeHistory()
    }

    /**
     * 修改事件触发动作
     */
    handleChangeEventAction(dataIndex: number, eventIndex: string) {
        //this.props.viewport.prepareWriteHistory()
        this.props.EditorEventAction.updateEventAction(this.props.ViewportStore.currentEditComponentMapUniqueKey, dataIndex, eventIndex, this.state.editType === 'web')
        //this.props.viewport.writeHistory()
    }

    handleExpand() {
        this.setState({
            isExpend: true
        })
        // 同时复制一份配置给 native
        //this.props.viewport.prepareWriteHistory()
        this.props.EditorEventAction.copyEventToNative(this.props.ViewportStore.currentEditComponentMapUniqueKey)
        //this.props.viewport.writeHistory()
    }

    handleCompress() {
        this.setState({
            isExpend: false,
            editType: 'web'
        })
        // 删除 native 的事件配置
        //this.props.viewport.prepareWriteHistory()
        this.props.EditorEventAction.removeNativeEvent(this.props.ViewportStore.currentEditComponentMapUniqueKey)
        //this.props.viewport.writeHistory()
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
            return JSON.stringify(this.props.ViewportStore.currentEditComponentInfo.props.gaeaEventData) === JSON.stringify(this.props.ViewportStore.currentEditComponentInfo.props.gaeaNativeEventData)
        } else {
            return false
        }
    }

    /**
     * 生成事件配置结构
     */
    renderEventEditor(eventData: Array<FitGaea.EventData>) {
        const typeOptions = (this.props.ViewportStore.currentEditComponentInfo.props.gaeaEvent && this.props.ViewportStore.currentEditComponentInfo.props.gaeaEvent.types) ? this.props.ViewportStore.currentEditComponentInfo.props.gaeaEvent.types.map((type, index) => {
            return {
                key: index.toString(),
                value: type.name
            }
        }) : []

        typeOptions.unshift({
            key: 'listen',
            value: '监听事件'
        })

        typeOptions.unshift({
            key: 'init',
            value: '初始化'
        })

        const eventOptions = (this.props.ViewportStore.currentEditComponentInfo.props.gaeaEvent && this.props.ViewportStore.currentEditComponentInfo.props.gaeaEvent.events) ? this.props.ViewportStore.currentEditComponentInfo.props.gaeaEvent.events.map((event, index) => {
            return {
                key: index.toString(),
                value: event.name
            }
        }) : []

        eventOptions.unshift({
            key: 'updateProps',
            value: '修改属性'
        })

        eventOptions.unshift({
            key: 'emit',
            value: '触发事件'
        })

        eventOptions.unshift({
            key: 'none',
            value: '无'
        })

        return eventData.map((data, index) => {
            let TypeEditor: React.ReactElement<any>
            switch (data.type) {
                case 'listen':
                    TypeEditor = (
                        <EventType index={index}
                            isWeb={this.state.editType === 'web'} />
                    )
                    break
            }

            let ActionEditor: React.ReactElement<any>
            switch (data.event) {
                case 'jumpUrl':
                    ActionEditor = (
                        <JumpUrlEvent index={index}
                            isWeb={this.state.editType === 'web'} />
                    )
                    break
                case 'call':
                    ActionEditor = (
                        <CallEvent index={index}
                            isWeb={this.state.editType === 'web'} />
                    )
                    break
                case 'emit':
                    ActionEditor = (
                        <EventEvent index={index}
                            isWeb={this.state.editType === 'web'} />
                    )
                    break
                case 'updateProps':
                    ActionEditor = (
                        <UpdatePropsEvent index={index}
                            isWeb={this.state.editType === 'web'} />
                    )
                    break
            }

            return (
                <div key={index}
                    className="event-item-container">
                    <div className="event-choose-container">
                        <div className="event-label">
                            <Select label="触发条件"
                                value={data.typeIndex > -1 ? data.typeIndex.toString() : data.type}
                                onChange={this.handleChangeEventTriggerCondition.bind(this, index)}
                                options={typeOptions} />
                        </div>
                        <div className="event-effect">
                            <Select label="动作"
                                value={data.eventIndex > -1 ? data.eventIndex.toString() : data.event}
                                onChange={this.handleChangeEventAction.bind(this, index)}
                                options={eventOptions} />
                        </div>
                        <div className="close-container"
                            onClick={this.handleRemoveEvent.bind(this, index)}>
                            <i className="fa fa-close" />
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
        // 当前不在编辑元素，不显示
        if (this.props.ViewportStore.currentEditComponentMapUniqueKey === null || !this.props.ViewportStore.currentEditComponentInfo) {
            return null
        }

        const Events = this.state.editType === 'web' ? this.renderEventEditor(this.props.ViewportStore.currentEditComponentInfo.props.gaeaEventData) : this.renderEventEditor(this.props.ViewportStore.currentEditComponentInfo.props.gaeaNativeEventData)

        const notEmpty = this.state.editType === 'web' ? this.props.ViewportStore.currentEditComponentInfo.props.gaeaEventData.length > 0 : this.props.ViewportStore.currentEditComponentInfo.props.gaeaNativeEventData.length > 0

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

                    {this.props.ApplicationStore.editorProps.isReactNative &&
                        <div className="expend-button-container">
                            {this.canExpend() &&
                                <Tooltip title="分别配置 web 与 native 的事件">
                                    <Button onClick={this.handleExpand.bind(this)}><i className="fa fa-expand" /></Button>
                                </Tooltip>
                            }

                            {this.state.isExpend &&
                                <ButtonGroup>
                                    {this.canCompress() &&
                                        <Tooltip title="统一编辑事件">
                                            <Button onClick={this.handleCompress.bind(this)}><i className="fa fa-compress" /></Button>
                                        </Tooltip>
                                    }
                                    <Tooltip title="只在web生效的事件">
                                        <Button active={this.state.editType === 'web'}
                                            onClick={this.changeEditType.bind(this, 'web')}>web</Button>
                                    </Tooltip>
                                    <Tooltip title="只在native生效的事件">
                                        <Button active={this.state.editType === 'native'}
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