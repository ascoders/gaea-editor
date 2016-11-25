import * as React from 'react'

export interface PropsDefine {
    /**
     * 插件列表
     */
    plugins?: Array<FitGaea.Plugin>

    /**
     * 通用组件
     */
    commonComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>

    /**
     * 自定义组件
     */
    customComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>

    /**
     * 根布局元素的 uniqueKey
     */
    rootLayoutComponentUniqueKey?: string

    /**
     * 页面初始化信息
     */
    defaultValue?: string

    /**
     * 默认配置信息
     */
    defaultSetting?: string

    /**
     * 是否是 react-native 环境
     */
    isReactNative?: boolean

    /**
     * 保存的回调
     */
    onSave?: (info?: string, setting?: string) => void

    /**
     * 发布的回调
     */
    onPublish?: (version: string, callback?: () => void) => void

    /**
     * 当前版本号
     */
    currentVersion?: string

    /**
     * 获取发布列表
     */
    onGetPublishList?: (page?: number, callback?: (result: Array<FitGaea.GetPublishListResult>) => void) => void

    /**
     * 预览版本内容(内容是根版本走的，但配置一个编辑器只有一份)
     */
    onPreviewVersion?: (version?: string, callback?: (content: string) => void) => void

    /**
     * 切换版本号
     */
    onSwitchVersion?: (version?: string, callback?: (content: string) => void) => void

    /**
     * 自定义组件的配置文件，当然还是优先使用组件 props 中的配置
     */
    customOptions?: {
        [className: string]: FitGaea.ComponentProps
    }

    [x: string]: any
}

export class Props implements PropsDefine {
    plugins = [] as Array<FitGaea.Plugin>
    commonComponents = [] as Array<React.ComponentClass<FitGaea.ComponentProps>>
    customComponents = [] as Array<React.ComponentClass<FitGaea.ComponentProps>>
    rootLayoutComponentUniqueKey = 'gaea-layout'
    defaultValue = null as string
    defaultSetting = null as string
    isReactNative = false
    onSave = () => {
    }
    onPublish = () => {
    }
    onGetPublishList = () => {
    }
    onSwitchVersion = () => {
    }
    onPreviewVersion = () => {
    }
    currentVersion = '0.0.0'
    customOptions = null as any
}

export interface StateDefine {

}

export class State implements StateDefine {

}