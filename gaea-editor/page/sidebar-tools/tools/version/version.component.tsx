import * as React from 'react'
import * as typings from './version.type'
import {observer, inject} from 'mobx-react'

import {Button, ButtonGroup} from '../../../../../../../web-common/button/index'

import './version.scss'

@inject('application') @observer
export default class Version extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    componentWillMount() {
        if (this.props.application.currentVersionPage === 0) {
            // 如果没拉取过版本信息，拉取一下
            this.props.application.setCurrentVersionPage(1)
            this.props.application.event.emit(this.props.application.event.onGetPublishList,this.props.application.currentVersionPage)
        }
    }

    /**
     * 预览某个版本
     */
    handlePreviewVersion(version: string) {
        this.props.application.event.emit(this.props.application.event.onPreviewVersion, version)
    }

    /**
     * 切换某个版本
     */
    handleSwitchVersion(version: string) {
        this.props.application.event.emit(this.props.application.event.onSwitchVersion, version)
    }

    render() {
        const Versions = this.props.application.versionList.map((version, index)=> {
            return (
                <div className="version-container"
                     key={index}>
                    <div className="version-header-container">
                        <div className="version-title">
                            {version.version}
                        </div>
                        {this.props.application.currentVersion === version.version ?
                            <div className="current-version-tag">当前版本</div>:
                            <ButtonGroup>
                                <Button onClick={this.handlePreviewVersion.bind(this,version.version)}>预览</Button>
                                <Button onClick={this.handleSwitchVersion.bind(this,version.version)}>切换</Button>
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