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

    toggleShowTemplate(leftBarName: string) {
        if (this.state.currentName === leftBarName) {
            // 收起
            this.props.viewport.hideLeftBar()
            this.setState({
                currentName: null
            })
        } else {
            if (this.state.currentName === null) {
                this.props.viewport.showLeftBar(leftBarName)
            } else {
                this.props.viewport.hideLeftBar()
                this.props.viewport.showLeftBar(leftBarName)
            }
            this.setState({
                currentName: leftBarName
            })
        }
    }

    render() {
        const templateClasses = classNames({
            'menu-item': true,
            'active': this.state.currentName === 'template'
        })

        const externalParameterClasses = classNames({
            'menu-item': true,
            'active': this.state.currentName === 'externalParameter'
        })

        const globalVariableClasses = classNames({
            'menu-item': true,
            'active': this.state.currentName === 'globalVariable'
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
                             onClick={this.toggleShowTemplate.bind(this, 'template')}>
                            <i className="fa fa-list-alt"/>
                        </div>
                    </Tooltip>

                    <Tooltip position="right"
                             title="外部参数">
                        <div className={externalParameterClasses}
                             onClick={this.toggleShowTemplate.bind(this, 'externalParameter')}>
                            <i className="fa fa-paper-plane-o"/>
                        </div>
                    </Tooltip>

                    <Tooltip position="right"
                             title="全局变量">
                        <div className={globalVariableClasses}
                             onClick={this.toggleShowTemplate.bind(this, 'globalVariable')}>
                            <i className="fa fa-globe"/>
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