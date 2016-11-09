import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './page.type'
import {observer} from 'mobx-react'
import * as classNames from 'classnames'

import {autoBindMethod} from '../../../../common/auto-bind/index'

import Viewport from './viewport/viewport.component'

import './page.scss'

@observer(['application', 'applicationAction', 'viewport', 'viewportAction', 'event', 'eventAction'])
export default class Page extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    /**
     * 关闭编辑框
     */
    @autoBindMethod handleCloseEditor() {
        this.props.viewportAction.setCurrentEditComponentMapUniqueKey(null)
    }

    render() {
        const navbarBottomRightContainerClasses = classNames({
            'navbar-center__right-container': true,
            'show-editor-container': this.props.viewport.currentEditComponentMapUniqueKey !== null
        })

        // .15s 后触发视图区域刷新事件
        setTimeout(()=> {
            this.props.eventAction.emit(this.props.event.viewportUpdated)
        }, 160)

        return (
            <div className="_namespace">
                <div className="outer-left-container">
                    <div className="navbar-container"
                         style={{height:this.props.application.navbarHeight}}>
                        {this.props.applicationAction.loadingPluginByPosition('navbarLeft')}
                    </div>
                    <div className="navbar-center-container">
                        <div className="navbar-center__left-container">
                            <div className="navbar-center__left__top-container">
                                {this.props.applicationAction.loadingPluginByPosition('navbarLeftTop')}
                            </div>
                            <div className="navbar-center__left__bottom-container">
                                {this.props.applicationAction.loadingPluginByPosition('navbarLeftBottom')}
                            </div>
                        </div>
                        <div className={navbarBottomRightContainerClasses}>
                            <div className="viewport-container"
                                 style={Object.assign({}, this.props.application.viewportStyle)}>
                                <Viewport/>
                                {this.props.applicationAction.loadingPluginByPosition('viewport')}
                            </div>
                            <div className="editor-container">
                                {this.props.applicationAction.loadingPluginByPosition('editor')}
                                <div onClick={this.handleCloseEditor}
                                     className="editor-close">
                                    <i className="fa fa-close close-button"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-bottom-container">
                        3
                    </div>
                </div>
                <div className="outer-right-container">
                    <div className="outer-right__top-container">
                        {this.props.applicationAction.loadingPluginByPosition('mainToolTop')}
                    </div>
                    <div className="outer-right__bottom-container">
                        {this.props.applicationAction.loadingPluginByPosition('mainToolBottom')}
                    </div>
                </div>
            </div>
        )
    }
}