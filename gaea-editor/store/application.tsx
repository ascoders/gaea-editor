/**
 * 整体应用的信息,一个 app 通用的配置信息
 */

import {observable, action} from 'mobx'
import * as React from 'react'
import * as _ from 'lodash'
import deepDiff from '../utils/deep-diff'
import Event from './event'

export default class Application {
    public event = new Event()

    /**
     * 头部栏高度
     */
    @observable headerHeight = 37

    /**
     * 左侧边栏宽度
     */
    @observable leftSidebarWidth = 240

    /**
     * 右侧边栏宽度
     */
    @observable sidebarWidth = 240

    /**
     * 右附加侧边栏宽度
     */
    @observable sidebarAddonWidth = 280

    /**
     * 底部栏高度
     */
    @observable footerHeight = 25

    /**
     * 编辑区域宽度百分比 1~100
     */
    @observable viewportWidth = 100

    /**
     * 是否正在移动侧边栏
     */
    @observable isSidebarMoving = false

    /**
     * 是否在预览状态
     */
    @observable isPreview = false

    /**
     * 组合组件
     */
    @observable comboComponents: Array<FitGaea.ComboComponentInfo> = []

    /**
     * 基础组件
     */
    baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>> = []

    /**
     * 定制组件
     */
    customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>> = []

    /**
     * 是否隐藏通用组件
     */
    isHideCustomComponents = false

    /**
     * 标题名称
     */
    title = ''

    /**
     * 页面显示 json
     */
    defaultValue: {
        [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
    }

    /**
     * 页面高度
     */
    height: number

    /**
     * 是不是 reactNative
     */
    isReactNative: boolean

    @action('初始化配置') setInitPropsToApplication(props: {
        title: string,
        baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>,
        customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>,
        isHideCustomComponents: boolean,
        height: number,
        defaultValue: {
            [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
        },
        isReactNative: boolean
    }) {
        this.title = props.title
        this.baseComponents = props.baseComponents
        this.setCustomComponents(props.customComponents)
        this.isHideCustomComponents = props.isHideCustomComponents
        this.defaultValue = props.defaultValue
        this.height = props.height
        this.isReactNative = props.isReactNative
    }

    @action('设置定制组件') setCustomComponents(customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>) {
        this.customComponents = customComponents
    }

    @action('添加一个组合') addComboComponent(comboComponent: FitGaea.ComboComponentInfo) {
        // 添加之前，把能删的都删掉
        comboComponent.componentInfo = this.cleanComponent(comboComponent.componentInfo)
        comboComponent.childs && Object.keys(comboComponent.childs).forEach(childMapUniqueKey=> {
            comboComponent.childs[childMapUniqueKey] = this.cleanComponent(comboComponent.childs[childMapUniqueKey])
        })

        this.comboComponents.push(comboComponent)
    }

    @action('根据 uniqueKey 获取组件 Class') getComponentByUniqueKey(uniqueKey: string) {
        if (this.baseComponents) {
            for (let component of this.baseComponents) {
                if (component.defaultProps.gaeaUniqueKey === uniqueKey) {
                    return component
                }
            }
        }

        for (let component of this.customComponents) {
            if (component.defaultProps.gaeaUniqueKey === uniqueKey) {
                return component
            }
        }

        return null
    }

    @action('设置视图区域宽度') setViewportWidth(width: number) {
        this.viewportWidth = width
    }

    @action('设置侧边栏宽度') setSidebarWidth(value: number) {
        if (value < 180) {
            value = 180
        }
        if (value > 600) {
            value = 600
        }
        this.sidebarWidth = value
    }

    @action('设置侧边栏是否在移动状态') setSidebarMoving(isMoving: boolean) {
        this.isSidebarMoving = isMoving
    }

    @action('修改预览状态') setPreview(isPreview: boolean) {
        this.isPreview = isPreview
    }

    /************************************************************
     * 辅助方法
     ************************************************************/

    /**
     * 将 componentInfo 不需要保存的信息都移除
     */
    cleanComponent(componentInfo: FitGaea.ViewportComponentInfo) {
        // 转成标准格式
        const planComponentInfo: FitGaea.ViewportComponentInfo = JSON.parse(JSON.stringify(componentInfo))

        // 获取这个组件的 defaultProps
        const defaultProps = _.cloneDeep(this.getComponentByUniqueKey(planComponentInfo.props.gaeaUniqueKey).defaultProps)

        // 把 defaultProps 中相同的内容从 props 中剥离掉
        const deepDiffProps = deepDiff(planComponentInfo.props, defaultProps)

        // 一定要留着 gaeaUniqueKey
        deepDiffProps.gaeaUniqueKey = planComponentInfo.props.gaeaUniqueKey

        planComponentInfo.props = deepDiffProps

        // layoutChilds 长度为 0 就干掉
        if (planComponentInfo.layoutChilds && planComponentInfo.layoutChilds.length === 0) {
            delete planComponentInfo.layoutChilds
        }

        // 如果 props 已经被删完了, 直接删掉 props
        if (!planComponentInfo.props || Object.keys(planComponentInfo.props).length === 0) {
            delete planComponentInfo.props
        }

        delete planComponentInfo.props.gaeaEdit
        delete planComponentInfo.props.gaeaIcon

        return JSON.parse(JSON.stringify(planComponentInfo))
    }

    /**
     * 把组件完整信息补回来，根据 defaultProps
     */
    expendComponent(componentInfo: FitGaea.ViewportComponentInfo) {
        // 转成标准格式
        const planComponentInfo = _.toPlainObject<FitGaea.ViewportComponentInfo>(componentInfo)

        // 获取这个组件的 defaultProps
        const defaultProps = _.cloneDeep(this.getComponentByUniqueKey(planComponentInfo.props.gaeaUniqueKey).defaultProps)

        planComponentInfo.props = _.merge(defaultProps, planComponentInfo.props)

        return planComponentInfo
    }
}