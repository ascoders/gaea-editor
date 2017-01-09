import * as React from 'react'
import * as typings from './tab-tools-version.type'
import * as classNames from 'classnames'

import Action from './action'
import Store from './store'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import { Button, ButtonGroup } from '../../../../../web-common/button/index'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './tab-tools-version.scss'

@EditorManager.observer(['TabToolsVersionStore', 'ApplicationStore', 'ApplicationAction', 'TabToolsVersionAction', 'EventStore', 'EventAction'])
export default class TabToolsVersion extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'tabToolsVersion'
    static Action = Action
    static Store = Store

    componentWillMount() {
        if (this.props.TabToolsVersionStore.currentVersionPage === 0) {
            // 如果没拉取过版本信息，拉取一下
            this.props.TabToolsVersionAction.setCurrentVersionPage(1)
            this.props.ApplicationStore.editorProps.onGetPublishList(this.props.TabToolsVersionStore.currentVersionPage, result => {
                this.props.TabToolsVersionAction.addVersions(result)
            })
        }
    }

    /**
     * 预览某个版本
     */
    handlePreviewVersion(version: string) {
        this.props.ApplicationStore.editorProps.onPreviewVersion(version, content => {
            this.props.ApplicationAction.updatePage(content)
            this.props.EventAction.emit(this.props.EventStore.refreshPage)
        })
    }

    /**
     * 切换某个版本
     */
    handleSwitchVersion(version: string) {
        this.props.ApplicationStore.editorProps.onSwitchVersion(version, content => {
            this.props.TabToolsVersionAction.setCurrentVersion(version)
        })
    }

    render() {
        const Versions = this.props.TabToolsVersionStore.versionList.map((version, index) => {
            return (
                <div className="version-container"
                    key={index}>
                    <div className="version-header-container">
                        <div className="version-title">
                            {version.version}
                        </div>
                        {this.props.TabToolsVersionStore.currentVersion === version.version ?
                            <div className="current-version-tag">当前版本</div> :
                            <ButtonGroup>
                                <Button onClick={this.handlePreviewVersion.bind(this, version.version)}>预览</Button>
                                <Button onClick={this.handleSwitchVersion.bind(this, version.version)}>切换</Button>
                            </ButtonGroup>
                        }

                    </div>

                    <div className="version-description">{version.description}</div>
                </div>
            )
        })

        return (
            <div className="_namespace">
                {Versions}
            </div>
        )
    }
}