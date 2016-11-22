import * as React from 'react'
import * as typings from './editor-tabs-attribute.type'
import * as _ from 'lodash'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import { Input } from '../../../../../web-common/input/index'
import { Button, ButtonGroup } from '../../../../../web-common/button/index'
import { Tooltip } from '../../../../../web-common/tooltip/index'
import { autoBindMethod } from '../../../../../common/auto-bind/index'
import ToTemplate from './to-template/to-template.component'

import './editor-tabs-attribute.scss'

@EditorManager.observer(['ViewportStore', 'EditorEventStore', 'ViewportAction', 'ApplicationAction', 'EditorEventAction'])
export default class EditorTabsAttribute extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttribute'

    @autoBindMethod handleGaeaNameChange(value: string) {
        this.props.ViewportAction.updateCurrentEditComponentProps('gaeaName', value)
    }

    /**
     * 删除
     */
    @autoBindMethod handleDelete() {
        this.props.ViewportAction.removeComponent(this.props.ViewportStore.currentEditComponentMapUniqueKey)
    }

    /**
     * 重置
     */
    @autoBindMethod handleReset() {
        this.props.ViewportAction.resetProps(this.props.ViewportStore.currentEditComponentMapUniqueKey)
    }

    /**
     * 修改属性的事件结束了
     */
    @autoBindMethod handleConfirmEditPropsEvent() {
        const eventData = this.props.EditorEventStore.currentEditIsWeb ? 'gaeaEventData' : 'gaeaNativeEventData'
        // 把当前值赋值
        const cleanProps = this.props.ApplicationAction.cleanComponentProps(this.props.ViewportStore.currentEditComponentInfo.props)
        this.props.ViewportAction.updateCurrentEditComponentProps(`${eventData}.${this.props.EditorEventStore.currentEditEventIndex}.eventData.props`, cleanProps)
        // 取消修改属性
        this.props.EditorEventAction.setCurrentEditPropsIndex(null)
    }

    renderHeaderContainer() {
        return (
            <div className="header-container">
                <div className="header-container__icon-container">
                    <i className={`fa fa-${this.props.ViewportStore.currentEditComponentInfo.props.gaeaIcon}`} />
                </div>
                <div className="header-container__title-container">
                    <Input normal={true}
                        label=""
                        onChange={this.handleGaeaNameChange}
                        value={this.props.ViewportStore.currentEditComponentInfo.props.gaeaName} />
                </div>
                <div className="header-container__operate-container">
                    <ButtonGroup>
                        <Tooltip title="设置为模板">
                            <ToTemplate />
                        </Tooltip>
                        {this.props.ViewportStore.currentEditComponentInfo.parentMapUniqueKey !== null &&
                            <Tooltip title="重置属性">
                                <Button className="child-scale"
                                    onClick={this.handleReset}>
                                    <i className="fa fa-refresh" />
                                </Button>
                            </Tooltip>
                        }
                        {this.props.ViewportStore.currentEditComponentInfo.parentMapUniqueKey !== null &&
                            <Tooltip title="移除此元素">
                                <Button className="child-scale"
                                    onClick={this.handleDelete}>
                                    <i className="fa fa-trash danger" />
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
                style={{ margin: 10 }}
                rounded={true}
                onClick={this.handleConfirmEditPropsEvent}>确定</Button>
        )
    }

    render() {
        // 当前不在编辑元素，不显示
        if (this.props.ViewportStore.currentEditComponentMapUniqueKey === null || !this.props.ViewportStore.currentEditComponentInfo) {
            return null
        }

        // 编辑组件
        const EditItems = this.props.ViewportStore.currentEditComponentInfo.props.gaeaEdit && this.props.ViewportStore.currentEditComponentInfo.props.gaeaEdit.map((editInfo, index) => {
            // 如果是字符串类型，直接生成标题
            if (editInfo.constructor.name === 'String') {
                return (
                    <div key={index}
                        className="title">{editInfo.toString()}</div>
                )
            } else {
                return (
                    <div key={index}>
                        {this.props.ApplicationAction.loadingPluginByPosition(`editorAttribute${_.upperFirst(_.camelCase(editInfo.editor))}`, {
                            editInfo
                        })}
                    </div>
                )
            }
        })

        return (
            <div className="_namespace">
                {this.props.EditorEventStore.currentEditPropsIndex === null ? this.renderHeaderContainer() : this.renderUpdateAttributeEvent()}

                <div className="body-container">
                    {EditItems}
                </div>
            </div>
        )
    }
}