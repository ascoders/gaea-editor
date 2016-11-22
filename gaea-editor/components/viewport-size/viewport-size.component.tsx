import * as React from 'react'
import * as typings from './viewport-size.type'
import * as classNames from 'classnames'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './viewport-size.scss'

@EditorManager.observer(['ApplicationStore', 'GlobalSettingStore', 'ViewportAction', 'GlobalSettingAction'])
export default class ViewportSize extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarRight'

    @autoBindMethod changeFitInWeb(type: string) {
        this.props.GlobalSettingAction.changeFitInWeb(type)
    }

    @autoBindMethod handleChangeMobileSize(width: number, height: number) {
        this.props.GlobalSettingAction.changeFitInWeb('mobile')
        this.props.GlobalSettingAction.setViewportSize(width, height)
    }

    render() {
        const mobileClasses = classNames({
            'menu-item': true,
            'mobile-root': true,
            'viewport-size-active': this.props.GlobalSettingStore.fitInWeb === 'mobile'
        })
        const desktopClasses = classNames({
            'menu-item': true,
            'viewport-size-active': this.props.GlobalSettingStore.fitInWeb === 'pc'
        })

        return (
            <div className="_namespace no-style">
                <div className={mobileClasses}>
                    <i className="fa fa-mobile" />
                    <div className="mobile-container">
                        <div className={classNames({
                            'phone': true,
                            'active': this.props.GlobalSettingStore.fitInWeb === 'mobile' && this.props.GlobalSettingStore.viewportWidth === 640 / 2 && this.props.GlobalSettingStore.viewportHeight === 1136 / 2
                        })}
                            onClick={this.handleChangeMobileSize.bind(this, 640 / 2, 1136 / 2)}>
                            <i className="fa fa-mobile" />
                            <div>iPhone5s</div>
                        </div>
                        <div className={classNames({
                            'phone': true,
                            'active': this.props.GlobalSettingStore.fitInWeb === 'mobile' && this.props.GlobalSettingStore.viewportWidth === 720 / 2 && this.props.GlobalSettingStore.viewportHeight === 1280 / 2
                        })}
                            onClick={this.handleChangeMobileSize.bind(this, 720 / 2, 1280 / 2)}>
                            <i className="fa fa-mobile" />
                            <div>Android</div>
                        </div>
                        <div className={classNames({
                            'phone': true,
                            'active': this.props.GlobalSettingStore.fitInWeb === 'mobile' && this.props.GlobalSettingStore.viewportWidth === 750 / 2 && this.props.GlobalSettingStore.viewportHeight === 1334 / 2
                        })}
                            onClick={this.handleChangeMobileSize.bind(this, 750 / 2, 1334 / 2)}>
                            <i className="fa fa-mobile" />
                            <div>iPhone6</div>
                        </div>
                        <div className={classNames({
                            'phone': true,
                            'active': this.props.GlobalSettingStore.fitInWeb === 'mobile' && this.props.GlobalSettingStore.viewportWidth === 828 / 2.5 && this.props.GlobalSettingStore.viewportHeight === 1472 / 2.5
                        })}
                            onClick={this.handleChangeMobileSize.bind(this, 828 / 2.5, 1472 / 2.5)}>
                            <i className="fa fa-mobile" />
                            <div>iPhone7</div>
                        </div>
                    </div>
                </div>
                <div className={desktopClasses}
                    onClick={this.changeFitInWeb.bind(this, 'pc')}><i className="fa fa-desktop" />
                </div>
            </div>
        )
    }
}