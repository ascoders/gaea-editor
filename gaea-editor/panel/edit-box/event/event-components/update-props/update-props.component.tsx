import * as React from 'react'
import * as typings from './update-props.type'
import {observer, inject} from 'mobx-react'
import * as _ from 'lodash'

import {Button} from '../../../../../../../../web-common/button/index'

import './update-props.scss'

@inject('viewport', 'application') @observer
export default class UpdatePropsEvent extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    handleClick() {
        const eventData = this.props.isWeb ? 'gaeaEventData' : 'gaeaNativeEventData'

        if (this.props.viewport.currentEditPropsIndex !== this.props.index) {
            const customData = this.props.isWeb ? this.componentInfo.props.gaeaEventData[this.props.index].eventData as FitGaea.EventUpdatePropsEvent : this.componentInfo.props.gaeaNativeEventData[this.props.index].eventData as FitGaea.EventUpdatePropsEvent

            if (!customData || !customData.props) {
                // 如果还没有值，复制当前数据
                const cleanProps = this.props.application.cleanComponentProps(this.componentInfo.props)
                this.props.viewport.updateComponentValueWithNoHistory(`${eventData}.${this.props.index}.eventData.props`, cleanProps)

                this.props.viewport.setCurrentEditPropsIndex(this.props.index, _.cloneDeep(cleanProps), this.props.isWeb, this.props.index)
            } else {
                this.props.viewport.setCurrentEditPropsIndex(this.props.index, JSON.parse(JSON.stringify(customData.props)), this.props.isWeb, this.props.index)
            }
        } else { // 取消
            // 把当前值赋值
            const cleanProps = this.props.application.cleanComponentProps(this.componentInfo.props)
            this.props.viewport.updateComponentValueWithNoHistory(`${eventData}.${this.props.index}.eventData.props`, cleanProps)
            // 取消修改属性
            this.props.viewport.setCurrentEditPropsIndex(null)
        }
    }

    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)

        return (
            <div className="_namespace">
                <Button active={this.props.viewport.currentEditPropsIndex === this.props.index}
                        onClick={this.handleClick.bind(this)}><i className="fa fa-pencil"
                                                                 style={{marginRight:5}}/>修改属性</Button>
            </div>
        )
    }
}