import * as React from 'react'
import * as typings from './text.type'
import {observer, inject} from 'mobx-react'

import Input from '../../../../../../../../web-common/input/index'

@inject('viewport') @observer
export default class EditComponentText extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)
        const textOpts = {
            label: '',
            disabled: !this.props.editOption.editable,
            value: this.props.viewport.getPropsByFieldWithEditor(this.componentInfo.props, this.props.editOption),
            onChange: (value: string)=> {
                this.props.viewport.updateComponentOptionsValue(this.props.editOption, value)
            }
        }

        return (
            <Input {...textOpts}/>
        )
    }
}