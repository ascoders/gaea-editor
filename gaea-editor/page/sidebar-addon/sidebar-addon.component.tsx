import * as React from 'react'
import * as typings from './sidebar-addon.type'
import {observer, inject} from 'mobx-react'

import * as classNames from 'classnames'

import EditBox from '../../panel/edit-box/edit-box.component'

import './sidebar-addon.scss'

@inject('application', 'viewport') @observer
export default class SidebarAddon extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        const classes = classNames({
            '_namespace': true,
            'show': this.props.viewport.isShowSidebarAddon
        })

        return (
            <div className={classes}>
                <EditBox/>
            </div>
        )
    }
}