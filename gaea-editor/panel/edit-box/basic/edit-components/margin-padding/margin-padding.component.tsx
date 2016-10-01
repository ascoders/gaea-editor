import * as React from 'react'
import * as typings from './margin-padding.type'
import {observer, inject} from 'mobx-react'
import * as _ from 'lodash'

import MarginPaddingEditor from '../../../../../../../../web-common/margin-padding-editor/index'

@inject('viewport') @observer
export default class EditComponentText extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    private marginPaddingValues: {
        [x: string]: number
    } = {}

    private marginPaddingOldValue: {
        [x: string]: number
    } = {}

    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)

        this.marginPaddingValues['marginLeft'] = this.componentInfo.props['marginLeft']
        this.marginPaddingValues['marginTop'] = this.componentInfo.props['marginTop']
        this.marginPaddingValues['marginRight'] = this.componentInfo.props['marginRight']
        this.marginPaddingValues['marginBottom'] = this.componentInfo.props['marginBottom']
        this.marginPaddingValues['paddingLeft'] = this.componentInfo.props['paddingLeft']
        this.marginPaddingValues['paddingTop'] = this.componentInfo.props['paddingTop']
        this.marginPaddingValues['paddingRight'] = this.componentInfo.props['paddingRight']
        this.marginPaddingValues['paddingBottom'] = this.componentInfo.props['paddingBottom']
        this.marginPaddingOldValue = _.cloneDeep(this.marginPaddingValues)
    }

    handleChange(name: string, value: number) {
        // 直接改值
        this.marginPaddingValues[name] = value
        this.props.viewport.updateComponentOptionsValueByOptions(this.props.viewport.currentEditComponentMapUniqueKey, this.props.editOption, this.marginPaddingValues)
    }

    handleFinalChange(name: string, value: number) {
        // 先把值改回去
        this.props.viewport.updateComponentOptionsValueByOptions(this.props.viewport.currentEditComponentMapUniqueKey, this.props.editOption, this.marginPaddingOldValue)
        // 直接记录历史
        this.marginPaddingValues[name] = value
        this.marginPaddingOldValue = _.cloneDeep(this.marginPaddingValues)
        this.props.viewport.updateComponentOptionsValue(this.props.editOption, this.marginPaddingValues)
    }

    render() {
        return (
            <MarginPaddingEditor size={220}
                                 marginLeft={this.componentInfo.props['marginLeft']}
                                 marginTop={this.componentInfo.props['marginTop']}
                                 marginRight={this.componentInfo.props['marginRight']}
                                 marginBottom={this.componentInfo.props['marginBottom']}
                                 paddingLeft={this.componentInfo.props['paddingLeft']}
                                 paddingTop={this.componentInfo.props['paddingTop']}
                                 paddingRight={this.componentInfo.props['paddingRight']}
                                 paddingBottom={this.componentInfo.props['paddingBottom']}
                                 onChange={this.handleChange.bind(this)}
                                 onFinalChange={this.handleFinalChange.bind(this)}/>
        )
    }
}