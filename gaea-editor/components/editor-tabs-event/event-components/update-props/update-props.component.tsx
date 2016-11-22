import * as React from 'react'
import * as typings from './update-props.type'
import {observer, inject} from 'mobx-react'
import * as _ from 'lodash'

import {Button} from '../../../../../../../web-common/button/index'

import * as EditorManager from '../../../../../gaea-editor-manager/gaea-editor-manager'
import Action from '../../action'

import './update-props.scss'

@inject('ViewportStore', 'EditorEventAction', 'EditorEventStore', 'ApplicationAction', 'ViewportAction') @observer
export default class UpdatePropsEvent extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    handleClick() {
        const eventData = this.props.isWeb ? 'gaeaEventData' : 'gaeaNativeEventData'

        if (this.props.EditorEventStore.currentEditPropsIndex !== this.props.index) {
            const customData = this.props.isWeb ? this.props.ViewportStore.currentEditComponentInfo.props.gaeaEventData[this.props.index].eventData as FitGaea.EventUpdatePropsEvent : this.props.ViewportStore.currentEditComponentInfo.props.gaeaNativeEventData[this.props.index].eventData as FitGaea.EventUpdatePropsEvent

            if (!customData || !customData.props) {
                // 如果还没有值，复制当前数据
                const cleanProps = this.props.ApplicationAction.cleanComponentProps(this.props.ViewportStore.currentEditComponentInfo.props)
                this.props.ViewportAction.updateCurrentEditComponentProps(`${eventData}.${this.props.index}.eventData.props`, cleanProps)

                this.props.EditorEventAction.setCurrentEditPropsIndex(this.props.index, _.cloneDeep(cleanProps), this.props.isWeb, this.props.index)
            } else {
                this.props.EditorEventAction.setCurrentEditPropsIndex(this.props.index, JSON.parse(JSON.stringify(customData.props)), this.props.isWeb, this.props.index)
            }
        } else { // 取消
            // 把当前值赋值
            const cleanProps = this.props.ApplicationAction.cleanComponentProps(this.props.ViewportStore.currentEditComponentInfo.props)
            this.props.ViewportAction.updateCurrentEditComponentProps(`${eventData}.${this.props.index}.eventData.props`, cleanProps)
            // 取消修改属性
            this.props.EditorEventAction.setCurrentEditPropsIndex(null)
        }
    }

    render() {
        return (
            <div className="_namespace">
                <Button active={this.props.EditorEventStore.currentEditPropsIndex === this.props.index}
                        onClick={this.handleClick.bind(this)}><i className="fa fa-pencil"
                                                                 style={{marginRight:5}}/>修改属性</Button>
            </div>
        )
    }
}