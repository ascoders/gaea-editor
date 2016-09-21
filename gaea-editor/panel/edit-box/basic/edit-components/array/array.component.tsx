import * as React from 'react'
import * as typings from './array.type'
import {observer, inject} from 'mobx-react'

import Button from '../../../../../../../../web-common/button/index'

@inject('viewport') @observer
export default class EditComponentText extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    /**
     * 新增一项配置
     */
    handleAdd() {
        let field = this.componentInfo.props[this.props.editOption.field] as Array<any>
        if (field === null) {
            field = []
        }

        field.push({})
        this.componentInfo.props[this.props.editOption.field] = field
    }

    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)

        let field = this.componentInfo.props[this.props.editOption.field] as Array<any>

        const Element = field.constructor.name === 'Array' && field.map(item=> {
                return (
                    <div>111</div>
                )
            })

        return (
            <div>
                {Element}
                <Button onClick={this.handleAdd.bind(this)}>+</Button>
            </div>
        )
    }
}