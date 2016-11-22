import * as React from 'react'
import {inject} from '../../../../common/inject-instance/index'
import {action, extendObservable, observable} from 'mobx'
import ApplicationStore from '../stores/application'
import deepDiff from '../utils/deep-diff'

export default class ApplicationAction {
    @inject('ApplicationStore') private application: ApplicationStore
    @observable observableClass = true

    @action('根据位置加载插件') loadingPluginByPosition(position: string, props: any = {}): Array<React.ReactElement<any>> {
        return this.application.plugins.map((plugin, index) => {
            if (plugin.position === position) {
                props.key = index
                return React.createElement(plugin, props)
            }
        })
    }

    @action('设置视图区块样式') setViewportStyle(style: React.CSSProperties) {
        this.application.viewportStyle = extendObservable(this.application.viewportStyle, style)
    }

    @action('设置视图区块父级样式') setViewportContainerStyle(style: React.CSSProperties) {
        this.application.viewportContainerStyle = extendObservable(this.application.viewportContainerStyle, style)
    }

    @action('重置视图区块样式') resetViewportStyle() {
        this.application.viewportStyle = {}
    }

    @action('根据 gaeaUniqueKey 获取组件类') getComponentClassByGaeaUniqueKey(gaeaUniqueKey: string) {
        // 从通用、定制组件中查找
        const allComponents = this.application.editorProps.commonComponents.concat(this.application.customComponents)
        return allComponents.find(component => component.defaultProps.gaeaUniqueKey === gaeaUniqueKey)
    }

    @action('设置预览状态') setPreview(inPreview: boolean) {
        this.application.inPreview = inPreview
    }

    @action('更新整体页面') updatePage(pageValue: string) {
        this.application.pageValue = pageValue
    }

    /**
     * 将 componentInfo 不需要保存的信息都移除
     */
    cleanComponent(componentInfo: FitGaea.ViewportComponentInfo) {
        // 转成标准格式
        const planComponentInfo: FitGaea.ViewportComponentInfo = JSON.parse(JSON.stringify(componentInfo))

        // layoutChilds 长度为 0 就干掉
        if (planComponentInfo.layoutChilds && planComponentInfo.layoutChilds.length === 0) {
            delete planComponentInfo.layoutChilds
        }

        planComponentInfo.props = this.cleanComponentProps(planComponentInfo.props)

        if (planComponentInfo.props === null) {
            delete planComponentInfo.props
        }

        return JSON.parse(JSON.stringify(planComponentInfo))
    }

    /**
     * 将 props 中不需要的数据都清除
     */
    cleanComponentProps(componentProps: FitGaea.ComponentProps) {
        // 获取这个组件的 defaultProps
        const defaultProps = _.cloneDeep(this.getComponentClassByGaeaUniqueKey(componentProps.gaeaUniqueKey).defaultProps)
        let planComponentProps = JSON.parse(JSON.stringify(componentProps))

        // 把 defaultProps 中相同的内容从 props 中剥离掉
        const deepDiffProps = deepDiff(planComponentProps, defaultProps)

        // 一定要留着 gaeaUniqueKey
        deepDiffProps.gaeaUniqueKey = planComponentProps.gaeaUniqueKey

        planComponentProps = deepDiffProps

        delete planComponentProps.gaeaEdit
        delete planComponentProps.gaeaIcon
        delete planComponentProps.gaeaEvent

        if (planComponentProps.gaeaEventData.length === 0) {
            delete planComponentProps.gaeaEventData
        }

        if (planComponentProps.gaeaNativeEventData.length === 0) {
            delete planComponentProps.gaeaNativeEventData
        }

        if (planComponentProps.gaeaVariables.length === 0) {
            delete planComponentProps.gaeaVariables
        }

        if (_.isEmpty(planComponentProps.style)) {
            delete planComponentProps.style
        }

        // 如果 props 已经被删完了, 直接删掉 props
        if (!planComponentProps || Object.keys(planComponentProps).length === 0) {
            return null
        }

        return planComponentProps
    }

    /**
     * 把组件完整信息补回来，根据 defaultProps
     */
    expendComponent(componentInfo: FitGaea.ViewportComponentInfo) {
        // 转成标准格式
        const planComponentInfo = _.toPlainObject<FitGaea.ViewportComponentInfo>(componentInfo)

        planComponentInfo.props = this.expendComponentProps(planComponentInfo.props)

        return planComponentInfo
    }

    /**
     * 补全组件 props
     */
    expendComponentProps(componentProps: FitGaea.ComponentProps) {
        // 转成标准格式
        let planComponentProps = _.toPlainObject<FitGaea.ComponentProps>(componentProps)

        // 获取这个组件的 defaultProps
        const defaultProps = _.cloneDeep(this.getComponentClassByGaeaUniqueKey(planComponentProps.gaeaUniqueKey).defaultProps)

        planComponentProps = _.merge(defaultProps, planComponentProps)

        return planComponentProps
    }
}