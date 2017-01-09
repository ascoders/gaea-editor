import * as React from 'react'
import * as typings from './color.type'
import {observer, inject} from 'mobx-react'

import {ChromePicker} from 'react-color'
import {autoBindMethod} from '../../../../../common/auto-bind/index'
import Tooltip from '../../../../../web-common/tooltip/index'

import './color.scss'

@observer
export default class Color extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    handleColorChange(color: any) {
        this.props.onChange(color)
    }

    handleColorChangeComplete(color: any) {
        this.props.onChangeComplete(color)
    }

    @autoBindMethod titleRender() {
        return (
            <ChromePicker label="hex"
                          onChange={this.handleColorChange.bind(this)}
                          onChangeComplete={this.handleColorChangeComplete.bind(this)}
                          color={this.props.color}/>
        )
    }

    render() {
        return (
            <div className="_namespace">
                <Tooltip type="click"
                         showShadow={true}
                         shadowStyle={{opacity:0}}
                         titleRender={this.titleRender}
                         simple={true}>
                    <div className="color-picker-label-container">
                        <div className="color-picker-label"
                             style={{backgroundColor:this.props.color}}/>
                    </div>
                </Tooltip>
            </div>
        )
    }
}