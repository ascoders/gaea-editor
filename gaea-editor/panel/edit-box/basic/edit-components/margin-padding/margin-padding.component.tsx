import * as React from 'react'
import * as typings from './margin-padding.type'
import {observer, inject} from 'mobx-react'
import * as _ from 'lodash'

import MarginPaddingEditor from '../../../../../../../../web-common/margin-padding-editor/index'

import './margin-padding.scss'

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
        this.init()
    }

    componentWillReceiveProps() {
        this.init()
    }

    init() {
        this.marginPaddingValues['marginLeft'] = this.componentInfo.props.style.marginLeft
        this.marginPaddingValues['marginTop'] = this.componentInfo.props.style.marginTop
        this.marginPaddingValues['marginRight'] = this.componentInfo.props.style.marginRight
        this.marginPaddingValues['marginBottom'] = this.componentInfo.props.style.marginBottom
        this.marginPaddingValues['paddingLeft'] = this.componentInfo.props.style.paddingLeft
        this.marginPaddingValues['paddingTop'] = this.componentInfo.props.style.paddingTop
        this.marginPaddingValues['paddingRight'] = this.componentInfo.props.style.paddingRight
        this.marginPaddingValues['paddingBottom'] = this.componentInfo.props.style.paddingBottom
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
            <div className="_namespace">
                <MarginPaddingEditor size={220}
                                     marginLeft={this.componentInfo.props.style.marginLeft}
                                     marginTop={this.componentInfo.props.style.marginTop}
                                     marginRight={this.componentInfo.props.style.marginRight}
                                     marginBottom={this.componentInfo.props.style.marginBottom}
                                     paddingLeft={this.componentInfo.props.style.paddingLeft}
                                     paddingTop={this.componentInfo.props.style.paddingTop}
                                     paddingRight={this.componentInfo.props.style.paddingRight}
                                     paddingBottom={this.componentInfo.props.style.paddingBottom}
                                     onChange={this.handleChange.bind(this)}
                                     onFinalChange={this.handleFinalChange.bind(this)}/>
            </div>
        )
    }
}