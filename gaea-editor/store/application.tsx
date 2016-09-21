/**
 * 整体应用的信息,一个 app 通用的配置信息
 */

import {observable} from 'mobx'
import * as React from 'react'
import Event from './event'

export default class Application {
    public event = new Event()

    /**
     * 头部栏高度
     */
    @observable headerHeight = 37

    /**
     * 侧边栏宽度
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

    setViewportWidth(width: number) {
        this.viewportWidth = width
    }

    /**
     * 设置侧边栏宽度
     */
    setSidebarWidth(value: number) {
        if (value < 180) {
            value = 180
        }
        if (value > 600) {
            value = 600
        }
        this.sidebarWidth = value
    }

    /**
     * 设置侧边栏是否在移动状态
     */
    setSidebarMoving(isMoving: boolean) {
        this.isSidebarMoving = isMoving
    }

    /**
     * 是否正在移动侧边栏
     */
    @observable isSidebarMoving = false

    /**
     * 是否在预览状态
     */
    @observable isPreview = false

    /**
     * 修改预览状态
     */
    setPreview(isPreview: boolean) {
        this.isPreview = isPreview
    }

    /**
     * 标题名称
     */
    title = ''

    /**
     * 页面默认编辑信息
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

    /**
     * 将接收到的 props 赋值到 application 中
     */
    setInitPropsToApplication(props: {
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

    /**
     * 基础组件
     */
    baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>> = []

    /**
     * 定制组件
     */
    customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>> = []

    /**
     * 设置定制组件
     */
    setCustomComponents(customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>) {
        this.customComponents = customComponents
    }

    /**
     * 组合组件
     */
    @observable comboComponents: Array<FitGaea.ComboComponentInfo> = []

    /**
     * 添加一个组合
     */
    addComboComponent(comboComponent: FitGaea.ComboComponentInfo) {
        this.comboComponents.push(comboComponent)
    }

    /**
     * 根据 uniqueKey 获取组件
     */
    getComponentByUniqueKey(uniqueKey: string) {
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

    /**
     * 是否隐藏通用组件
     */
    isHideCustomComponents = false
}