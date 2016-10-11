import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './gaea-editor.type'
import {observer, Provider} from 'mobx-react'

import ApplicationStore from './store/application'
import ViewportStore from './store/viewport'
import Setting from './store/setting'

import Page from './page/page.component'

@observer
export default class GaeaEditor extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    private applicationStore = new ApplicationStore()
    private viewport = new ViewportStore(this.applicationStore)
    private setting = new Setting()

    private handleOnSaveBind = this.handleOnSave.bind(this)

    componentWillMount() {
        // 将初始化的 props 赋值到 store 上
        this.setPropsToApplication.call(this, this.props)

        // 监听
        this.addListener.call(this)
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
        this.applicationStore.setInitPropsToApplication({
            title: props.title,
            baseComponents: props.baseComponents,
            customComponents: props.customComponents,
            isHideCustomComponents: props.isHideCustomComponents,
            height: props.height,
            // 页面编辑信息
            defaultValue: props.defaultValue,
            isReactNative: props.isReactNative
        })
    }

    /**
     * 获取根节点 ref
     */
    getRootRef(ref: React.ReactInstance) {
        this.viewport.setRootDomInstance(ReactDOM.findDOMNode(ref))
    }

    /**
     * 添加监听
     */
    addListener() {
        this.applicationStore.event.on(this.applicationStore.event.onSave, this.handleOnSaveBind)
    }

    /**
     * 移除监听
     */
    removeListener() {
        this.applicationStore.event.off(this.applicationStore.event.onSave, this.handleOnSaveBind)
    }

    /**
     * 触发保存
     */
    handleOnSave(context: any, componentsInfo: string) {
        this.props.onSave(componentsInfo)
    }

    render() {
        return (
            <Provider application={this.applicationStore}
                      viewport={this.viewport}
                      setting={this.setting}>
                <Page ref={this.getRootRef.bind(this)}/>
            </Provider>
        )
    }
}
                