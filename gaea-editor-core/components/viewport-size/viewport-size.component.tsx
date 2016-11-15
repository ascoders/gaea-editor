import * as React from 'react'
import * as typings from './viewport-size.type'
import * as classNames from 'classnames'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import {autoBindMethod} from '../../../../../common/auto-bind/index'
import GlobalSettingAction from '../global-setting/action'

import './viewport-size.scss'

@EditorManager.observer(['application', 'globalSettingStore'])
export default class ViewportSize extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarRight'

    @EditorManager.lazyInject(EditorManager.ViewportAction) private viewportAction: EditorManager.ViewportAction
    @EditorManager.lazyInject(GlobalSettingAction) private globalSettingAction: GlobalSettingAction

    @autoBindMethod changeFitInWeb(type: string) {
        this.globalSettingAction.changeFitInWeb(type)
    }

    @autoBindMethod handleChangeMobileSize(width: number, height: number) {
        this.globalSettingAction.changeFitInWeb('mobile')
        this.globalSettingAction.setViewportSize(width, height)
    }

    render() {
        const mobileClasses = classNames({
            'menu-item': true,
            'mobile-root': true,
            'viewport-size-active': this.props.globalSettingStore.fitInWeb === 'mobile'
        })
        const desktopClasses = classNames({
            'menu-item': true,
            'viewport-size-active': this.props.globalSettingStore.fitInWeb === 'pc'
        })

        return (
            <div className="_namespace no-style">
                <div className={mobileClasses}>
                    <i className="fa fa-mobile"/>
                    <div className="mobile-container">
                        <div className={classNames({
                            'phone':true,
                            'active':this.props.globalSettingStore.fitInWeb==='mobile'&&this.props.globalSettingStore.viewportWidth===640/2&&this.props.globalSettingStore.viewportHeight===1136/2
                        })}
                             onClick={this.handleChangeMobileSize.bind(this,640/2,1136/2)}>
                            <i className="fa fa-mobile"/>
                            <div>iPhone5s</div>
                        </div>
                        <div className={classNames({
                            'phone':true,
                            'active':this.props.globalSettingStore.fitInWeb==='mobile'&&this.props.globalSettingStore.viewportWidth===720/2&&this.props.globalSettingStore.viewportHeight===1280/2
                        })}
                             onClick={this.handleChangeMobileSize.bind(this,720/2,1280/2)}>
                            <i className="fa fa-mobile"/>
                            <div>Android</div>
                        </div>
                        <div className={classNames({
                            'phone':true,
                            'active':this.props.globalSettingStore.fitInWeb==='mobile'&&this.props.globalSettingStore.viewportWidth===750/2&&this.props.globalSettingStore.viewportHeight===1334/2
                        })}
                             onClick={this.handleChangeMobileSize.bind(this,750/2,1334/2)}>
                            <i className="fa fa-mobile"/>
                            <div>iPhone6</div>
                        </div>
                        <div className={classNames({
                            'phone':true,
                            'active':this.props.globalSettingStore.fitInWeb==='mobile'&&this.props.globalSettingStore.viewportWidth===828/2.5&&this.props.globalSettingStore.viewportHeight===1472/2.5
                        })}
                             onClick={this.handleChangeMobileSize.bind(this,828/2.5,1472/2.5)}>
                            <i className="fa fa-mobile"/>
                            <div>iPhone7</div>
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