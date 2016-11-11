import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './page.type'
import {observer} from 'mobx-react'
import * as classNames from 'classnames'

import {autoBindMethod} from '../../../../common/auto-bind/index'

import Viewport from './viewport/viewport.component'

import ApplicationAction from '../actions/application'
import EventAction from '../actions/event'
import ViewportAction from '../actions/viewport'
import {lazyInject} from '../utils/kernel'

import './page.scss'

@observer(['application', 'viewport', 'event'])
export default class Page extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    @lazyInject(ApplicationAction) private applicationAction: ApplicationAction
    @lazyInject(EventAction) private eventAction: EventAction
    @lazyInject(ViewportAction) private viewportAction: ViewportAction

    /**
     * 关闭编辑框
     */
    @autoBindMethod handleCloseEditor() {
        this.viewportAction.setCurrentEditComponentMapUniqueKey(null)
    }

    render() {
        const navbarBottomRightContainerClasses = classNames({
            'navbar-center__right-container': true,
            'show-editor-container': this.props.viewport.currentEditComponentMapUniqueKey !== null
        })

        // .15s 后触发视图区域刷新事件
        setTimeout(()=> {
            this.eventAction.emit(this.props.event.viewportUpdated)
        }, 200)

        return (
            <div className="_namespace">
                <div className="outer-left-container">
                    <div className="navbar-container"
                         style={{height:this.props.application.navbarHeight}}>
                        <div className="navbar-container__left">
                            {this.applicationAction.loadingPluginByPosition('navbarLeft')}
                        </div>
                        <div className="navbar-container__right">
                            {this.applicationAction.loadingPluginByPosition('navbarRight')}
                        </div>
                    </div>
                    <div className="navbar-center-container">
                        <div className="navbar-center__left-container">
                            <div className="navbar-center__left__top-container">
                                {this.applicationAction.loadingPluginByPosition('navbarLeftTop')}
                            </div>
                            <div className="navbar-center__left__bottom-container">
                                {this.applicationAction.loadingPluginByPosition('navbarLeftBottom')}
                            </div>
                        </div>
                        <div className={navbarBottomRightContainerClasses}>
                            <div className="viewport-container"
                                 style={Object.assign({}, this.props.application.viewportStyle)}>
                                <Viewport/>
                                {this.applicationAction.loadingPluginByPosition('viewport')}
                            </div>
                            <div className="editor-container">
                                {this.applicationAction.loadingPluginByPosition('editor')}
                                <div onClick={this.handleCloseEditor}
                                     className="editor-close">
                                    <i className="fa fa-close close-button"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-bottom-container">

                    </div>
                </div>
                <div className="outer-right-container">
                    <div className="outer-right__top-container">
                        {this.applicationAction.loadingPluginByPosition('mainToolTop')}
                    </div>
                    <div className="outer-right__bottom-container">
                        {this.applicationAction.loadingPluginByPosition('mainToolBottom')}
                    </div>
                </div>
            </div>
        )
    }
}