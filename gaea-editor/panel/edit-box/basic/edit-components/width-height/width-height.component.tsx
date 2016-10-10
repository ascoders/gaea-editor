import * as React from 'react'
import * as typings from './width-height.type'
import {observer, inject} from 'mobx-react'
import * as _ from 'lodash'

import {Number} from '../../../../../../../../web-common/number/index'

import './width-height.scss'

/**
 * 处理一下输入框结果
 */
const parseInputValue = (value: string, unit: string): number | string=> {
    if (value === '') {
        return null
    } else if (unit === '') {
        return parseInt(value)
    } else {
        return value + unit
    }
}

@inject('viewport', 'application') @observer
export default class EditComponentWidthHeight extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 当前编辑的组件
    private componentInfo: FitGaea.ViewportComponentInfo

    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey)
    }

    renderInput(label: string, field: string) {
        const units = this.props.application.isReactNative ? null : [{
            key: '',
            value: 'px'
        }, {
            key: '%',
            value: '%'
        }]
        const currentUnit = this.props.application.isReactNative ? null : _.endsWith(this.componentInfo.props.style[field], '%') ? '%' : ''

        return (
            <div className="input-container">
                <span className="input-container-label">{label}</span>
                <Number label=""
                        value={this.componentInfo.props.style[field] || ''}
                        placeholder="Null"
                        units={units}
                        currentUnit={currentUnit}
                        onChange={this.handleChangeValue.bind(this,field)}/>
            </div>
        )
    }

    /**
     * 修改了输入框的值
     */
    handleChangeValue(field: string, value: string, unit: string) {
        this.setState({
            [field]: value
        })
        if (this.props.application.isReactNative) {
            this.props.viewport.updateComponentValue(`style.${field}`, parseInt(value))
        } else {
            this.props.viewport.updateComponentValue(`style.${field}`, parseInputValue(value, unit))
        }
    }

    render() {
        return (
            <div className="_namespace">
                <div className="line">
                    <div className="container-left">
                        {this.renderInput('宽度', 'width')}
                    </div>
                    <div className="container-right">
                        {this.renderInput('高度', 'height')}
                    </div>
                </div>
                <div className="line">
                    <div className="container-left">
                        {this.renderInput('max', 'maxWidth')}
                    </div>
                    <div className="container-right">
                        {this.renderInput('max', 'maxHeight')}
                    </div>
                </div>
                <div className="line">
                    <div className="container-left">
                        {this.renderInput('min', 'minWidth')}
                    </div>
                    <div className="container-right">
                        {this.renderInput('min', 'minHeight')}
                    </div>
                </div>
            </div>
        )
    }
}