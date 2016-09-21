import * as React from 'react'
import * as typings from './left-bar.type'
import {observer, inject} from 'mobx-react'
import * as classNames from 'classnames'

import './left-bar.scss'

import Template from './template/template.component'

@inject('application', 'viewport') @observer
export default class SidebarAddon extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    toggleShowLayoutBorder() {
        this.props.viewport.setShowLayoutBorder(!this.props.viewport.showLayoutBorder)
    }

    toggleShowTemplate() {
        if (!this.props.viewport.isShowLeftBar) {
            this.props.viewport.showLeftBar('template')
        } else {
            this.props.viewport.hideLeftBar()
        }
    }

    render() {
        const templateClasses = classNames({
            'menu-item': true,
            'active': this.props.viewport.isShowLeftBar
        })

        const showLayoutClasses = classNames({
            'menu-item': true,
            'active': this.props.viewport.isMovingComponent || this.props.viewport.showLayoutBorder
        })

        const extendClasses = classNames({
            'extend-container': true,
            'show': this.props.viewport.isShowLeftBar
        })

        let templateChildren: React.ReactElement<any> = null
        switch (this.props.viewport.leftBarType) {
            case 'template':
                templateChildren = <Template/>
                break
        }

        return (
            <div className="_namespace">
                <div className="container">
                    <div className="top">
                        <div className={templateClasses}
                             onClick={this.toggleShowTemplate.bind(this)}>
                            <i className="fa fa-list-alt"/>
                        </div>
                    </div>

                    <div className="bottom">
                        <div className={showLayoutClasses}
                             onClick={this.toggleShowLayoutBorder.bind(this)}>
                            <i className="fa fa-eye"/>
                        </div>
                    </div>
                </div>

                <div className={extendClasses}>
                    {templateChildren}
                </div>
            </div>
        )
    }
}