import * as React from 'react'
import * as typings from './left-bar.type'
import {observer, inject} from 'mobx-react'
import * as classNames from 'classnames'

import Template from './template/template.component'
import GlobalParam from './global-param/global-param.component'

import './left-bar.scss'

@inject('application', 'viewport') @observer
export default class SidebarAddon extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        const extendClasses = classNames({
            '_namespace': true,
            'extend-container': true,
            'show': this.props.viewport.isShowLeftBar
        })

        let templateChildren: React.ReactElement<any> = null
        switch (this.props.viewport.leftBarType) {
            case 'template':
                templateChildren = <Template/>
                break
            case 'globalParam':
                templateChildren = <GlobalParam/>
                break
        }

        return (
            <div className="_namespace">
                <div className={extendClasses}>
                    {templateChildren}
                </div>
            </div>
        )
    }
}