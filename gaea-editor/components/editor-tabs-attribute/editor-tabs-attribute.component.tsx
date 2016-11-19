import * as React from 'react'
import * as typings from './editor-tabs-attribute.type'
import * as _ from 'lodash'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import {Input} from '../../../../../web-common/input/index'
import {Button, ButtonGroup} from '../../../../../web-common/button/index'
import {Tooltip} from '../../../../../web-common/tooltip/index'
import {autoBindMethod} from '../../../../../common/auto-bind/index'
import ToTemplate from './to-template/to-template.component'

import EventAction from '../editor-tabs-event/action'

import './editor-tabs-attribute.scss'

@EditorManager.observer(['viewport', 'eventStore'])
export default class EditorTabsAttribute extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttribute'

    @EditorManager.lazyInject(EditorManager.ViewportAction) private viewportAction: EditorManager.ViewportAction
    @EditorManager.lazyInject(EditorManager.ApplicationAction) private applicationAction: EditorManager.ApplicationAction
    @EditorManager.lazyInject(EventAction) private eventAction: EventAction

    @autoBindMethod handleGaeaNameChange(value: string) {
        this.viewportAction.updateCurrentEditComponentProps('gaeaName', value)
    }

    /**
     * 删除
     */
    @autoBindMethod handleDelete() {
        this.viewportAction.removeComponent(this.props.viewport.currentEditComponentMapUniqueKey)
    }

    /**
     * 重置
     */
    @autoBindMethod handleReset() {
        this.viewportAction.resetProps(this.props.viewport.currentEditComponentMapUniqueKey)
    }

    /**
     * 修改属性的事件结束了
     */
    @autoBindMethod handleConfirmEditPropsEvent() {
        const eventData = this.props.eventStore.currentEditIsWeb ? 'gaeaEventData' : 'gaeaNativeEventData'
        // 把当前值赋值
        const cleanProps = this.applicationAction.cleanComponentProps(this.props.viewport.currentEditComponentInfo.props)
        this.viewportAction.updateCurrentEditComponentProps(`${eventData}.${this.props.eventStore.currentEditEventIndex}.eventData.props`, cleanProps)
        // 取消修改属性
        this.eventAction.setCurrentEditPropsIndex(null)
    }

    renderHeaderContainer() {
        return (
            <div className="header-container">
                <div className="header-container__icon-container">
                    <i className={`fa fa-${this.props.viewport.currentEditComponentInfo.props.gaeaIcon}`}/>
                </div>
                <div className="header-container__title-container">
                    <Input normal={true}
                           label=""
                           onChange={this.handleGaeaNameChange}
                           value={this.props.viewport.currentEditComponentInfo.props.gaeaName}/>
                </div>
                <div className="header-container__operate-container">
                    <ButtonGroup>
                        <Tooltip title="设置为模板">
                            <ToTemplate/>
                        </Tooltip>
                        {this.props.viewport.currentEditComponentInfo.parentMapUniqueKey !== null &&
                        <Tooltip title="重置属性">
                            <Button className="child-scale"
                                    onClick={this.handleReset}>
                                <i className="fa fa-refresh"/>
                            </Button>
                        </Tooltip>
                        }
                        {this.props.viewport.currentEditComponentInfo.parentMapUniqueKey !== null &&
                        <Tooltip title="移除此元素">
                            <Button className="child-scale"
                                    onClick={this.handleDelete}>
                                <i className="fa fa-trash danger"/>
                            </Button>
                        </Tooltip>
                        }
                    </ButtonGroup>
                </div>
            </div>
        )
    }

    renderUpdateAttributeEvent() {
        return (
            <Button type="primary"
                    style={{margin:10}}
                    rounded={true}
                    onClick={this.handleConfirmEditPropsEvent}>确定</Button>
        )
    }

    render() {
        // 当前不在编辑元素，不显示
        if (this.props.viewport.currentEditComponentMapUniqueKey === null || !this.props.viewport.currentEditComponentInfo) {
            return null
        }

        // 编辑组件
        const EditItems = this.props.viewport.currentEditComponentInfo.props.gaeaEdit && this.props.viewport.currentEditComponentInfo.props.gaeaEdit.map((editInfo, index)=> {
                // 如果是字符串类型，直接生成标题
                if (editInfo.constructor.name === 'String') {
                    return (
                        <div key={index}
                             className="title">{editInfo.toString()}</div>
                    )
                } else {
                    return (
                        <div key={index}>
                            {this.applicationAction.loadingPluginByPosition(`editorAttribute${_.upperFirst(_.camelCase(editInfo.editor))}`, {
                                editInfo
                            })}
                        </div>
                    )
                }
            })

        return (
            <div className="_namespace">
                {this.props.eventStore.currentEditPropsIndex === null ? this.renderHeaderContainer() : this.renderUpdateAttributeEvent()}

                <div className="body-container">
                    {EditItems}
                </div>
            </div>
        )
    }
}