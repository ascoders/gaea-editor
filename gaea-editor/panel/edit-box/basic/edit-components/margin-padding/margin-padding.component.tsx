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

    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)

    }

    handleStart() {
        this.props.viewport.prepareWriteHistory()
    }

    handleChange(name: string, value: number) {
        // 直接改值
        this.props.viewport.updateComponentValueWithNoHistory(`style.${name}`, value)
    }

    handleFinalChange(name: string, value: number) {
        this.props.viewport.updateComponentValueWithNoHistory(`style.${name}`, value)
        this.props.viewport.writeHistory()
    }

    render() {
        return (
            <div className="_namespace">
                <MarginPaddingEditor size={220}
                                     onStart={this.handleStart.bind(this)}
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