/**
 * 整体应用的信息,一个 app 通用的配置信息
 */

import {observable, action} from 'mobx'
import * as React from 'react'
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
}