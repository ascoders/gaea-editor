import * as React from 'react'
import * as typings from './basic.type'
import {observer, inject} from 'mobx-react'

import {autoBindMethod} from '../../../../../../common/auto-bind/index'
import {Button, ButtonGroup} from '../../../../../../web-common/button/index'
import Input from '../../../../../../web-common/input/index'

import RemoveButton from './remove-button/remove-button.component'
import SetGroupButton from './set-group-button/set-group-button.component'

import EditItem from './edit-item.component'

import './basic.scss'

@inject('viewport', 'application') @observer
export default class EditBoxBasic extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑组件的信息
    private componentInfo: FitGaea.ViewportComponentInfo

    /**
     * 重置为默认属性
     */
    @autoBindMethod resetOptions() {
        this.props.viewport.resetComponent(this.props.viewport.currentEditComponentMapUniqueKey)
    }

    /**
     * 修改组件标题
     */
    @autoBindMethod handleChangeName(value: string) {
        this.componentInfo.props.gaeaName = value
    }

    /**
     * 给标题输入框右侧增加删除按钮
     */
    @autoBindMethod titleInputRightRender() {
        // 根组件没有移除功能
        if (this.componentInfo.parentMapUniqueKey === null) {
            return null
        }

        return (
            <RemoveButton/>
        )
    }

    /**
     * 确认使用当前状态作为事件要修改的属性
     */
    @autoBindMethod handleConfirmEditProps() {
        const eventData = this.props.viewport.currentEditIsWeb ? 'gaeaEventData' : 'gaeaNativeEventData'
        // 把当前值赋值
        const cleanProps = this.props.application.cleanComponentProps(this.componentInfo.props)
        this.props.viewport.updateComponentValueWithNoHistory(`${eventData}.${this.props.viewport.currentEditEventIndex}.eventData.props`, cleanProps)
        // 取消修改属性
        this.props.viewport.setCurrentEditPropsIndex(null)
    }

    render() {
        if (!this.props.viewport.currentEditComponentMapUniqueKey) {
            return null
        }

        // 绑定组件信息
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)

        const Editors = this.componentInfo.props.gaeaEdit && this.componentInfo.props.gaeaEdit.map((editOption, index)=> {
                let key = `${this.props.viewport.currentEditComponentMapUniqueKey}-${editOption.field}-${editOption.editor}`

                // 如果是纯字符串，作为标题呈现
                if (editOption.constructor.name === 'String') {
                    key = `${this.props.viewport.currentEditComponentMapUniqueKey}-${editOption.toString()}`
                    return (
                        <div className="header-title"
                             key={key}
                             style={{marginTop:this.props.index===0?0:5}}>{editOption.toString()}</div>
                    )
                }

                return (
                    <EditItem editOption={editOption}
                              index={index}
                              key={key}/>
                )
            })

        // 重置按钮,非根节点才有
        let ResetButton: React.ReactElement<any> = null
        if (this.componentInfo.parentMapUniqueKey !== null) {
            ResetButton = (
                <Button onClick={this.resetOptions}>重置</Button>
            )
        }

        // 成组按钮,有 childs 的 layout 元素且非根节点才有
        let GroupButton: React.ReactElement<any> = null
        if (this.componentInfo.props.canDragIn && this.componentInfo.parentMapUniqueKey !== null) {
            GroupButton = (
                <SetGroupButton/>
            )
        }

        return (
            <div className="_namespace">
                {this.props.viewport.currentEditPropsIndex === null &&
                <div className="basic-title-container">
                    <div className="component-icon-container">
                        <i className={`fa fa-${this.componentInfo.props.gaeaIcon}`}/>
                    </div>
                    <Input className="title-name"
                           label=""
                           normal={true}
                           key={this.props.viewport.currentEditComponentMapUniqueKey}
                           onChange={this.handleChangeName}
                           rightRender={this.titleInputRightRender}
                           value={this.componentInfo.props.gaeaName}/>
                </div>
                }

                {this.props.viewport.currentEditPropsIndex !== null &&
                <div className="basic-title-container">
                    <Button type="primary"
                            rounded={true}
                            onClick={this.handleConfirmEditProps.bind(this)}>确认</Button>
                </div>
                }

                <div className="edit-item-container">
                    {Editors}
                </div>

                {this.props.viewport.currentEditPropsIndex === null &&
                <div className="bottom-addon">
                    <ButtonGroup>
                        {ResetButton}
                        {GroupButton}
                    </ButtonGroup>
                </div>
                }
            </div>
        )
    }
}