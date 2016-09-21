import * as React from 'react'
import * as typings from './sidebar-tools.type'
import {observer, inject} from 'mobx-react'

import * as classNames from 'classnames'

import Tools from './tools/tools.component'
import Tree from './tree/tree.component'

import './sidebar-tools.scss'

@inject('application') @observer
export default class SidebarTools extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        const classes = classNames({
            '_namespace': true
        })

        const style = {
            transform: this.props.application.isPreview ? `translate3d(${this.props.application.sidebarWidth}px, 0, 0)` : 'translate3d(0, 0, 0)',
            width: this.props.application.sidebarWidth
        }

        return (
            <div style={style}
                 className={classes}>
                <Tools/>
                <Tree/>
            </div>
        )
    }
}