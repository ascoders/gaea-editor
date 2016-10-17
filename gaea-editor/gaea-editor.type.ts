import * as React from 'react'
import {TransparentlyPropsPropsDefine} from '../../../common/transparently-props/index'

export interface PropsDefine extends TransparentlyPropsPropsDefine {
    /**
     * 导航栏标题
     */
    title?: string

    /**
     * 编辑器的高度
     */
    height?: number

    /**
     * 定制外部提供编辑组件
     */
    customComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>

    /**
     * 基础组件
     * web 引用 fit-gaea/lib/web-components
     * react-native 同时兼容 web 引用 fit-gaea/lib/native-components
     */
    baseComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>

    /**
     * 页面初始化信息
     */
    defaultValue?: string

    /**
     * 默认配置信息
     */
    defaultSetting?: string

    /**
     * 点击保存后会返回页面结构树信息
     * info.saveToVersion() 被执行后,本地会在顶部新增一个版本信息
     * 同时要后端把 info.pageInfo 和当前时间戳 存储起来,下次刷新时候获取,并且塞入到 versionInit 可以显示版本快照信息
     */
    onSave?: (info?: string, setting?: string) => void

    /**
     * 工具栏:是否只显示定制组件
     */
    isHideCustomComponents?: boolean

    /**
     * is for react-native?
     */
    isReactNative?: boolean

    /**
     * 当前版本号
     */
    currentVersion?: string

    /**
     * 获取发布列表
     */
    onGetPublishList?: (page?: number, callback?: (result: Array<FitGaea.GetPublishListResult>)=>void)=>void

    /**
     * 预览版本内容(内容是根版本走的，但配置一个编辑器只有一份)
     */
    onPreviewVersion?: (version?: string, callback?: (content: string)=>void)=>void

    /**
     * 切换版本号
     */
    onSwitchVersion?: (version?: string, callback?: (content: string)=>void)=>void

    /**
     * 发布
     */
    onPublish?: (version?: FitGaea.GetPublishListResult, callback?: ()=>void)=>void
}

export class Props implements PropsDefine {
    title = 'GaeaEditor'
    version = '0.0.0'
    customComponents = [] as Array<React.ComponentClass<FitGaea.ComponentProps>>
    isHideCustomComponents = false
    height = 450
    onSave = ()=> {
    }
    isReactNative = false
    onGetPublishList = ()=> {
    }
    onSwitchVersion = ()=> {
    }
    onPreviewVersion = ()=> {
    }
    onPublish = ()=> {
    }
}

export interface StateDefine {
    // 当前 version
    currentVersion?: string

    // 当前值
    value?: string
}

export class State implements StateDefine {
    currentVersion = ''
}
                