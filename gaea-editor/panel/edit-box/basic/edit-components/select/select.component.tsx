import * as React from 'react'
import * as typings from './select.type'
import {observer, inject} from 'mobx-react'

import {Select} from '../../../../../../../../web-common/select/index'

@inject('viewport') @observer
export default class EditComponentSelect extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)
        const selectorOpts = {
            label: this.props.editOption.label,
            disabled: !this.props.editOption.editable || this.props.editOption.isNull,
            defaultValue: this.props.editOption.isNull ? this.props.editOption.notNullValue as string : this.componentInfo.props[this.props.editOption.field] as string,
            options: this.props.editOption.selector,
            onChange: (value: string)=> {
                this.props.viewport.updateComponentOptionsValue(this.props.editOption, value)
            }
        }

        return (
            <Select {...selectorOpts} />
        )
    }
}
