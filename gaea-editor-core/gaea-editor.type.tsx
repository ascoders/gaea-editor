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
    onSave?: (info: string)=>void

    /**
     * 发布的回调
     */
    onPublish?: (version: string)=>void

    /**
     * 当前版本号
     */
    currentVersion?: string

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
    onSave = ()=> {
    }
    onPublish = ()=> {
    }
    currentVersion = '0.0.0'
}

export interface StateDefine {

}

export class State implements StateDefine {

}