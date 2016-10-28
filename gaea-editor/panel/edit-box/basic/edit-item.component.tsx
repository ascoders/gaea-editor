import * as React from 'react'
import * as typings from './edit-item.type'
import {observer, inject} from 'mobx-react'

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
import PositionEditor from './edit-components/position/position.component'
import VariableEditor from './edit-components/variable/variable.component'

import Tooltip from '../../../../../../web-common/tooltip/index'

@inject('viewport', 'application') @observer
export default class EditBoxBasic extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑组件的信息
    private componentInfo: FitGaea.ViewportComponentInfo

    componentWillMount() {
        // 判断自己是否处于变量编辑阶段
        this.init()
    }

    init() {
        // 绑定组件信息
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)

        // 判断是不是变量状态
        this.componentInfo.props.gaeaVariables.forEach(variable=> {
            if (variable.field === this.props.editOption.field) {
                this.setState({
                    inVariable: true
                })
            }
        })
    }

    handleChangeVariable(isIn: boolean) {
        this.setState({
            inVariable: isIn
        })

        if (!isIn) {
            // 不使用变量，清除变量字段
            this.props.viewport.removeVariable(this.props.viewport.currentEditComponentMapUniqueKey, this.props.editOption.field)
        }
    }

    render() {
        if (!this.props.viewport.currentEditComponentMapUniqueKey) {
            return null
        }

        let EditElement: React.ReactElement<any> = null

        let currentVariable: FitGaea.VariableData = null
        this.componentInfo.props.gaeaVariables.forEach(variable=> {
            if (variable.field === this.props.editOption.field) {
                currentVariable = JSON.parse(JSON.stringify(variable))
            }
        })

        switch (this.props.editOption.editor) {
            case 'text':
                EditElement = (
                    <TextEditor editOption={this.props.editOption}/>
                )
                break
            case 'selector':
                EditElement = (
                    <SelectEditor editOption={this.props.editOption}/>
                )
                break
            case 'switch':
                EditElement = (
                    <SwitchEditor editOption={this.props.editOption}/>
                )
                break
            case 'array':
                EditElement = (
                    <ArrayEditor editOption={this.props.editOption}/>
                )
                break
            case 'marginPadding':
                EditElement = (
                    <MarginPaddingEditor editOption={this.props.editOption}/>
                )
                break
            case 'number':
                EditElement = (
                    <NumberEditor editOption={this.props.editOption}/>
                )
                break
            case 'widthHeight':
                EditElement = (
                    <WidthHeightEditor editOption={this.props.editOption}/>
                )
                break
            case 'layout':
                EditElement = (
                    <LayoutEditor editOption={this.props.editOption}/>
                )
                break
            case 'overflow':
                EditElement = (
                    <OverflowEditor editOption={this.props.editOption}/>
                )
                break
            case 'background':
                EditElement = (
                    <BackgroundEditor editOption={this.props.editOption}/>
                )
                break
            case 'font':
                EditElement = (
                    <FontEditor editOption={this.props.editOption}/>
                )
                break
            case 'border':
                EditElement = (
                    <BorderEditor editOption={this.props.editOption}/>
                )
                break
            case 'instance':
                EditElement = (
                    <InstanceEditor editOption={this.props.editOption}/>
                )
                break
            case 'position':
                EditElement = (
                    <PositionEditor editOption={this.props.editOption}/>
                )
                break
        }

        return (
            <div className="edit-line-container">
                {this.props.editOption.label !== '' &&
                <div className="edit-line-label">
                    {this.props.editOption.label}
                </div>
                }
                {this.props.editOption.canVariable && !this.state.inVariable &&
                <div className="edit-line-variable-container">
                    <Tooltip title="点击以使用变量">
                        <div className="edit-line-enable-variable"
                             onClick={this.handleChangeVariable.bind(this, true)}>
                            <i className="fa fa-eercast"/>
                        </div>
                    </Tooltip>
                </div>
                }
                {this.props.editOption.canVariable && this.state.inVariable &&
                <div className="edit-line-variable-container">
                    <Tooltip title="点击以使用常量">
                        <div className="edit-line-enable-variable active"
                             onClick={this.handleChangeVariable.bind(this, false)}>
                            <i className="fa fa-eercast"/>
                        </div>
                    </Tooltip>
                </div>
                }

                {!this.state.inVariable &&
                <div className="edit-line-editor">
                    {EditElement}
                </div>
                }

                {this.state.inVariable &&
                <div className="edit-line-editor">
                    <VariableEditor variable={currentVariable}
                                    editOption={this.props.editOption}/>
                </div>
                }
            </div>
        )
    }
}