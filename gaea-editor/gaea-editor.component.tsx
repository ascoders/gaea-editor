import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './gaea-editor.type'
import {observer, Provider} from 'mobx-react'

import {autoBindMethod} from '../../../common/auto-bind/index'

import application from './store/application'
import ViewportStore from './store/viewport'
import Setting from './store/setting'

import Page from './page/page.component'

@observer
export default class GaeaEditor extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    private application = new application()
    private viewport = new ViewportStore(this.application)
    private setting = new Setting()

    componentWillMount() {
        // 将初始化的 props 赋值到 store 上
        this.setPropsToApplication.call(this, this.props)

        // 监听
        this.addListener.call(this)

        this.setState({
            value: this.props.defaultValue
        })
    }

    componentWillUnmount() {
        // 移除监听
        this.removeListener.call(this)
    }

    componentWillReceiveProps(nextProps: typings.PropsDefine) {
        // TODO 别每次都更新啊,要 shadowEqual 判断下是否相等
        // 再覆盖初始化数据
        this.setPropsToApplication.call(this, nextProps)
        // 因为初始化数据不会自动更新,所以要 forceUpdate 一下
        this.forceUpdate()
    }

    /**
     * 将 props 赋值到 store 中
     */
    setPropsToApplication(props: typings.PropsDefine) {
        this.application.setInitPropsToApplication(props)
        this.setting.setDefaultSetting(props.defaultSetting)
    }

    /**
     * 获取根节点 ref
     */
    @autoBindMethod getRootRef(ref: React.ReactInstance) {
        this.viewport.setRootDomInstance(ReactDOM.findDOMNode(ref))
    }

    /**
     * 添加监听
     */
    addListener() {
        this.application.event.on(this.application.event.onSave, this.handleOnSave)
        this.application.event.on(this.application.event.onGetPublishList, this.handleOnGetPublishList)
        this.application.event.on(this.application.event.onSwitchVersion, this.handleOnSwitchVersion)
        this.application.event.on(this.application.event.onPublish, this.handleOnPublish)
        this.application.event.on(this.application.event.onPreviewVersion, this.handleOnPreviewVersion)
    }

    /**
     * 移除监听
     */
    removeListener() {
        this.application.event.off(this.application.event.onSave, this.handleOnSave)
        this.application.event.off(this.application.event.onGetPublishList, this.handleOnGetPublishList)
        this.application.event.off(this.application.event.onSwitchVersion, this.handleOnSwitchVersion)
        this.application.event.off(this.application.event.onPublish, this.handleOnPublish)
        this.application.event.off(this.application.event.onPreviewVersion, this.handleOnPreviewVersion)
    }

    /**
     * 触发保存
     */
    @autoBindMethod handleOnSave(context: any, componentsInfo: string) {
        this.props.onSave(componentsInfo, this.setting.getZipSettingData())
    }

    /**
     * 触发获取版本列表
     */
    @autoBindMethod handleOnGetPublishList(context: any, page: number) {
        this.props.onGetPublishList(page, result=> {
            this.application.addVersions(result)
        })
    }

    /**
     * 触发发布
     */
    @autoBindMethod handleOnPublish(context: any, versionInfo: FitGaea.GetPublishListResult) {
        this.props.onPublish(versionInfo, ()=> {
            this.application.setCurrentVersion(versionInfo.version)
            this.application.publishToVersionList(versionInfo)
        })
    }

    /**
     * 触发版本预览
     */
    @autoBindMethod handleOnPreviewVersion(context: any, version: string) {
        this.props.onPreviewVersion(version, content=> {
            // 用新数据覆盖页面
            this.setState({
                value: content,
                currentVersion: version
            })
        })
    }

    /**
     * 触发切换版本（切换线上版本信息，而不是预览，预览不需要触发接口）
     */
    @autoBindMethod handleOnSwitchVersion(context: any, version: string) {
        this.props.onSwitchVersion(version, content=> {
            this.application.setCurrentVersion(version)
        })
    }

    render() {
        return (
            <Provider application={this.application}
                      viewport={this.viewport}
                      setting={this.setting}>
                <Page key={this.state.currentVersion}
                      ref={this.getRootRef}
                      value={this.state.value}/>
            </Provider>
        )
    }
}
                