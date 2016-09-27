import * as React from 'react'
import * as typings from './left-absolute-bar.type'
import {observer, inject} from 'mobx-react'
import * as classNames from 'classnames'

import {Tooltip} from '../../../../../web-common/tooltip/index'

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
                    <Tooltip position="right"
                             title="模板列表">
                        <div className={templateClasses}
                             onClick={this.toggleShowTemplate.bind(this)}>
                            <i className="fa fa-list-alt"/>
                        </div>
                    </Tooltip>
                </div>

                <div className="bottom">
                    <Tooltip position="right"
                             title="显示空布局块">
                        <div className={showLayoutClasses}
                             onClick={this.toggleShowLayoutBorder.bind(this)}>
                            <i className="fa fa-eye"/>
                        </div>
                    </Tooltip>
                </div>
            </div>
        )
    }
}