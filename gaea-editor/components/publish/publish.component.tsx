import * as React from 'react'
import * as typings from './publish.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import Modal from '../../../../../web-common/modal/index'
import Select from '../../../../../web-common/select/index'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import Action from './action'
import Store from './store'

import './publish.scss'

@EditorManager.observer(['ApplicationStore', 'PublishStore', 'PublishAction'])
export default class Publish extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarRight'

    static Action = Action
    static Store = Store

    componentWillMount() {
        this.initVersion()
    }

    componentWillReact() {
        this.initVersion()
    }

    initVersion() {
        const {nextPatch} = this.getNextVersion()
        this.setState({
            selectedVersion: nextPatch
        })
    }

    /**
     * 获取版本号
     */
    getNextVersion() {
        // 根据当前版本号，计算出下次可以升级的版本号
        let nextPatch = ''
        let nextMinor = ''
        let nextMajor = ''
        if (!this.props.PublishStore.currentVersion) {
            nextPatch = '0.0.1'
            nextMinor = '0.1.0'
            nextMajor = '1.0.0'
        } else {
            const versionSplit = this.props.PublishStore.currentVersion.split('.')
            if (versionSplit.length !== 3) {
                return null
            }
            nextPatch = `${versionSplit[0]}.${versionSplit[1]}.${parseInt(versionSplit[2]) + 1}`
            nextMinor = `${versionSplit[0]}.${parseInt(versionSplit[1]) + 1}.0`
            nextMajor = `${parseInt(versionSplit[0]) + 1}.0.0`
        }
        return { nextPatch, nextMinor, nextMajor }
    }

    @autoBindMethod handleShowModal() {
        this.setState({
            show: true
        })
    }

    @autoBindMethod handleOk() {
        this.setState({
            show: false
        }, () => {
            this.props.ApplicationStore.editorProps.onPublish(this.state.selectedVersion, () => {
                this.props.PublishAction.updateVersion(this.state.selectedVersion)
            })
        })
    }

    @autoBindMethod handleCancel() {
        this.setState({
            show: false
        })
    }

    /**
     * 选择了一个版本准备发布
     */
    @autoBindMethod handleSelectChange(version: string) {
        this.setState({
            selectedVersion: version
        })
    }

    render() {
        const {nextPatch, nextMinor, nextMajor} = this.getNextVersion()

        const selectOption = {
            value: nextPatch,
            options: [{
                key: nextPatch,
                value: nextPatch + ' 补丁'
            }, {
                key: nextMinor,
                value: nextMinor + ' 小版本更新'
            }, {
                key: nextMajor,
                value: nextMajor + ' 全新版本'
            }]
        }

        return (
            <div className="_namespace"
                onClick={this.handleShowModal}>
                发布
                <div className="_namespace">
                    <Modal className="_namespace"
                        show={this.state.show}
                        onOk={this.handleOk.bind(this)}
                        title="发布新版本"
                        onCancel={this.handleCancel.bind(this)}>
                        <Select label="版本号" {...selectOption}
                            onChange={this.handleSelectChange} />
                    </Modal>
                </div>
            </div>
        )
    }
}