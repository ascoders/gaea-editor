import * as React from 'react'
import * as typings from './editor-attribute-width-height.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import { Number } from '../../../../../web-common/number/index'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './editor-attribute-width-height.scss'

/**
 * 处理一下输入框结果
 */
const parseInputValue = (value: string, unit: string): number | string => {
    if (value === '') {
        return null
    } else if (unit === '') {
        return parseInt(value)
    } else {
        return value + unit
    }
}

@EditorManager.observer(['ViewportStore', 'ApplicationStore', 'ViewportAction'])
export default class EditorAttributeWidthHeight extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorAttributeWidthHeight'

    renderInput(label: string, field: string) {
        const units = this.props.ApplicationStore.editorProps.isReactNative ? null : [{
            key: '',
            value: 'px'
        }, {
            key: '%',
            value: '%'
        }]
        const currentUnit = this.props.ApplicationStore.editorProps.isReactNative ? null : _.endsWith(this.props.ViewportStore.currentEditComponentInfo.props.style[field], '%') ? '%' : ''

        return (
            <div className="input-container">
                <span className="input-container-label">{label}</span>
                <Number label=""
                    value={this.props.ViewportStore.currentEditComponentInfo.props.style[field] || ''}
                    placeholder="Null"
                    units={units}
                    currentUnit={currentUnit}
                    onChange={this.handleChangeValue.bind(this, field)} />
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
        if (this.props.ApplicationStore.editorProps.isReactNative) {
            this.props.ViewportAction.updateCurrentEditComponentProps(`style.${field}`, parseInt(value))
        } else {
            this.props.ViewportAction.updateCurrentEditComponentProps(`style.${field}`, parseInputValue(value, unit))
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