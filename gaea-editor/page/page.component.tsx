import * as React from 'react'
import * as typings from './page.type'
import { observer } from 'mobx-react'
import * as classNames from 'classnames'

import { autoBindMethod } from '../../../../common/auto-bind/index'

import Viewport from './viewport/viewport.component'
import Preview from '../../../gaea-preview/index'
import LeftBar from './left-bar/left-bar.component'

import Svg from './svg'

import './page.scss'

@observer(['ApplicationStore', 'ViewportStore', 'EventStore', 'ApplicationAction', 'EventAction', 'ViewportAction'])
export default class Page extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    /**
     * 关闭编辑框
     */
    @autoBindMethod handleCloseEditor() {
        this.props.ViewportAction.setCurrentEditComponentMapUniqueKey(null)
    }

    /**
     * 关闭左边工具栏
     */
    @autoBindMethod handleCloseLeftBar() {
        this.props.ApplicationAction.toggleLeftBar(null)
    }

    render() {
        const navbarBottomRightContainerClasses = classNames({
            'navbar-center__right-container': true,
            'show-editor-container': this.props.ViewportStore.currentEditComponentMapUniqueKey !== null,
            'transparent-background': this.props.ApplicationStore.viewportContainerStyle.backgroundColor === 'transparent',
            'show-left-bar': this.props.ApplicationStore.leftBarType !== null
        })

        // .15s 后触发视图区域刷新事件
        setTimeout(() => {
            this.props.EventAction.emit(this.props.EventStore.viewportUpdated)
        }, 200)

        const viewportToolSwitchContainerClasses = classNames({
            'viewport-tool-switch-container': true,
            'preview': this.props.ApplicationStore.inPreview
        })

        return (
            <div className="_namespace">
                <Svg />

                <div className="outer-left-container">
                    <div className="navbar-container"
                        style={{ height: this.props.ApplicationStore.navbarHeight }}>
                        <div className="navbar-container__left">
                            {this.props.ApplicationAction.loadingPluginByPosition('navbarLeft')}
                        </div>
                        <div className="navbar-container__right">
                            {this.props.ApplicationAction.loadingPluginByPosition('navbarRight')}
                        </div>
                    </div>
                    <div className="navbar-center-container">
                        <div className="navbar-center__left-container">
                            <div className="navbar-center__left__top-container">
                                {this.props.ApplicationAction.loadingPluginByPosition('leftBarTop')}
                            </div>
                            <div className="navbar-center__left__bottom-container">
                                {this.props.ApplicationAction.loadingPluginByPosition('leftBarBottom')}
                            </div>
                        </div>
                        <div className={navbarBottomRightContainerClasses}
                            style={Object.assign({}, this.props.ApplicationStore.viewportContainerStyle)}>
                            <div className="left-bar-container">
                                <LeftBar />
                                <div onClick={this.handleCloseLeftBar}
                                    className="left-bar-close">
                                    <i className="fa fa-close close-button" />
                                </div>
                            </div>

                            <div className="viewport-container"
                                style={Object.assign({}, this.props.ApplicationStore.viewportStyle, { display: this.props.ApplicationStore.inPreview ? 'none' : null })}>
                                <Viewport />
                                {this.props.ApplicationAction.loadingPluginByPosition('viewport')}
                            </div>

                            {this.props.ApplicationStore.inPreview &&
                                <div className="preview-container"
                                    style={Object.assign({}, this.props.ApplicationStore.viewportStyle)}>
                                    <Preview value={this.props.ViewportAction.getIncrementComponentsInfo()}
                                        baseComponents={this.props.ApplicationStore.editorProps.commonComponents}
                                        customComponents={this.props.ApplicationStore.editorProps.customComponents} />
                                    {this.props.ApplicationAction.loadingPluginByPosition('preview')}
                                </div>
                            }

                            <div className="editor-container">
                                {this.props.ApplicationAction.loadingPluginByPosition('editor')}
                                <div onClick={this.handleCloseEditor}
                                    className="editor-close">
                                    <i className="fa fa-close close-button" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-bottom-container">
                        {this.props.ApplicationAction.loadingPluginByPosition('bottomBar')}
                    </div>
                </div>
                <div className="outer-right-container">
                    <div className={viewportToolSwitchContainerClasses}>
                        <div className="viewport-tool-container">
                            <div className="outer-right__top-container">
                                {this.props.ApplicationAction.loadingPluginByPosition('mainToolTop')}
                            </div>
                            <div className="outer-right__bottom-container">
                                {this.props.ApplicationAction.loadingPluginByPosition('mainToolBottom')}
                            </div>
                        </div>
                        <div className="preview-tool-container">
                            您处于预览状态
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}