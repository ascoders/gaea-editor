import * as React from 'react'
import * as typings from './basic.type'
import {isObservable} from 'mobx'
import {observer, inject} from 'mobx-react'
import * as classNames from 'classnames'

import {autoBindMethod} from '../../../../../../common/auto-bind/index'
import {Button, ButtonGroup} from '../../../../../../web-common/button/index'
import {Checkbox} from '../../../../../../web-common/checkbox/index'
import Input from '../../../../../../web-common/input/index'

import RemoveButton from './remove-button/remove-button.component'
import SetGroupButton from './set-group-button/set-group-button.component'

import TextEditor from './edit-components/text/text.component'
import SelectEditor from './edit-components/select/select.component'
import SwitchEditor from './edit-components/switch/switch.component'
import ArrayEditor from './edit-components/array/array.component'
import MarginPaddingEditor from './edit-components/margin-padding/margin-padding.component'
import NumberEditor from './edit-components/number/number.component'
import WidthHeightEditor from './edit-components/width-height/width-height.component'
import LayoutEditor from './edit-components/layout/layout.component'
import OverflowEditor from './edit-components/overflow/overflow.component'
import BackgroundEditor from './edit-components/background/background.component'
import FontEditor from './edit-components/font/font.component'
import BorderEditor from './edit-components/border/border.component'
import InstanceEditor from './edit-components/instance/instance.component'

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

    render() {
        if (!this.props.viewport.currentEditComponentMapUniqueKey) {
            return null
        }

        // 绑定组件信息
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)

        const Editors = this.componentInfo.props.gaeaEdit && this.componentInfo.props.gaeaEdit.map((editOption, index)=> {
                let key = `${this.props.viewport.currentEditComponentMapUniqueKey}-${editOption.field}-${editOption.editor}`

                let EditElement: React.ReactElement<any> = null

                // 如果是纯字符串，作为标题呈现
                if (editOption.constructor.name === 'String') {
                    key = `${this.props.viewport.currentEditComponentMapUniqueKey}-${editOption.toString()}`
                    return (
                        <div className="header-title"
                             style={{marginTop:index===0?0:5}}
                             key={key}>{editOption.toString()}</div>
                    )
                }

                switch (editOption.editor) {
                    case 'text':
                        EditElement = (
                            <TextEditor editOption={editOption}/>
                        )
                        break
                    case 'selector':
                        EditElement = (
                            <SelectEditor editOption={editOption}/>
                        )
                        break
                    case 'switch':
                        EditElement = (
                            <SwitchEditor editOption={editOption}/>
                        )
                        break
                    case 'array':
                        EditElement = (
                            <ArrayEditor editOption={editOption}/>
                        )
                        break
                    case 'marginPadding':
                        EditElement = (
                            <MarginPaddingEditor editOption={editOption}/>
                        )
                        break
                    case 'number':
                        EditElement = (
                            <NumberEditor editOption={editOption}/>
                        )
                        break
                    case 'widthHeight':
                        EditElement = (
                            <WidthHeightEditor editOption={editOption}/>
                        )
                        break
                    case 'layout':
                        EditElement = (
                            <LayoutEditor editOption={editOption}/>
                        )
                        break
                    case 'overflow':
                        EditElement = (
                            <OverflowEditor editOption={editOption}/>
                        )
                        break
                    case 'background':
                        EditElement = (
                            <BackgroundEditor editOption={editOption}/>
                        )
                        break
                    case 'font':
                        EditElement = (
                            <FontEditor editOption={editOption}/>
                        )
                        break
                    case 'border':
                        EditElement = (
                            <BorderEditor editOption={editOption}/>
                        )
                        break
                    case 'instance':
                        EditElement = (
                            <InstanceEditor editOption={editOption}/>
                        )
                        break
                }

                return (
                    <div key={key}
                         className="edit-line-container">
                        {editOption.label !== '' &&
                        <div className="edit-line-label">
                            {editOption.label}
                        </div>
                        }
                        <div className="edit-line-editor">
                            {EditElement}
                        </div>
                    </div>
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
        if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.parentMapUniqueKey !== null) {
            GroupButton = (
                <SetGroupButton/>
            )
        }

        return (
            <div className="_namespace">
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

                <div className="edit-item-container">
                    {Editors}
                </div>
                <div className="bottom-addon">
                    <ButtonGroup>
                        {ResetButton}
                        {GroupButton}
                    </ButtonGroup>
                </div>
            </div>
        )
    }
}