import * as React from 'react'
import * as typings from './size.type'
import {observer, inject} from 'mobx-react'
import * as classNames from 'classnames'

import {autoBindMethod} from '../../../../../../common/auto-bind/index'

import './size.scss'

@inject('setting', 'application', 'viewport') @observer
export default class Size extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    @autoBindMethod changeFitInWeb(type: string) {
        this.props.setting.changeFitInWeb(type)
    }

    @autoBindMethod handleChangeMobileSize(width: number, height: number) {
        this.props.setting.changeFitInWeb('mobile')
        this.props.setting.setViewportSize(width, height)
    }

    render() {
        const mobileClasses = classNames({
            'menu-item': true,
            'mobile-root': true,
            'viewport-size-active': this.props.setting.data.fitInWeb === 'mobile'
        })
        //this.props.setting.data.viewportWidth === 40
        const desktopClasses = classNames({
            'menu-item': true,
            'viewport-size-active': this.props.setting.data.fitInWeb === 'pc'
        })

        return (
            <div className="_namespace">
                <div className={mobileClasses}>
                    <i className="fa fa-mobile"/>
                    <div className="mobile-container">
                        <div className={classNames({
                            'phone':true,
                            'active':this.props.setting.data.fitInWeb==='mobile'&&this.props.setting.data.viewportWidth===640/2&&this.props.setting.data.viewportHeight===1136/2
                        })}
                             onClick={this.handleChangeMobileSize.bind(this,640/2,1136/2)}>
                            <i className="fa fa-mobile"/>
                            <div>Iphone5s</div>
                        </div>
                        <div className={classNames({
                            'phone':true,
                            'active':this.props.setting.data.fitInWeb==='mobile'&&this.props.setting.data.viewportWidth===720/2&&this.props.setting.data.viewportHeight===1280/2
                        })}
                             onClick={this.handleChangeMobileSize.bind(this,720/2,1280/2)}>
                            <i className="fa fa-mobile"/>
                            <div>Android</div>
                        </div>
                        <div className={classNames({
                            'phone':true,
                            'active':this.props.setting.data.fitInWeb==='mobile'&&this.props.setting.data.viewportWidth===750/2&&this.props.setting.data.viewportHeight===1334/2
                        })}
                             onClick={this.handleChangeMobileSize.bind(this,750/2,1334/2)}>
                            <i className="fa fa-mobile"/>
                            <div>Iphone6</div>
                        </div>
                        <div className={classNames({
                            'phone':true,
                            'active':this.props.setting.data.fitInWeb==='mobile'&&this.props.setting.data.viewportWidth===828/2.5&&this.props.setting.data.viewportHeight===1472/2.5
                        })}
                             onClick={this.handleChangeMobileSize.bind(this,828/2.5,1472/2.5)}>
                            <i className="fa fa-mobile"/>
                            <div>Iphone7</div>
                        </div>
                    </div>
                </div>
                <div className={desktopClasses}
                     onClick={this.changeFitInWeb.bind(this,'pc')}><i className="fa fa-desktop"/>
                </div>
            </div>
        )
    }
}
//
// <input onChange={this.handleChangeViewportWidthByRange}
//        min="10"
//        max="100"
//        step="1"
//        value={this.props.setting.data.viewportWidth.toString()}
//        className="slider"
//        type="range"/>