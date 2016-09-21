import * as React from 'react'
import * as typings from './drag-source.type'
import {observer, inject} from 'mobx-react'

import './drag-source.scss'

@observer
export default class DragSourceComponent extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    /**
     * 鼠标进入
     */
    handleMouseEnter() {

    }

    /**
     * 鼠标离开
     */
    handleMouseLeave() {

    }

    render() {
        return (
            <div className="_namespace drag-box"
                 onMouseEnter={this.handleMouseEnter.bind(this)}
                 onMouseLeave={this.handleMouseLeave.bind(this)}>
                {this.props.children}
            </div>
        )
    }
}
