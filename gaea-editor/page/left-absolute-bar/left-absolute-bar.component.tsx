import * as React from 'react'
import * as typings from './left-absolute-bar.type'
import {observer, inject} from 'mobx-react'
import * as classNames from 'classnames'

import './left-absolute-bar.scss'

@inject('application', 'viewport') @observer
export default class LeftAbsoluteBar extends React.Component <typings.PropsDefine, typings.StateDefine> {
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

        return (
            <div className="_namespace">
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
        )
    }
}