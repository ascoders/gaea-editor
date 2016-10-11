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
     * 点击保存后会返回页面结构树信息
     * info.saveToVersion() 被执行后,本地会在顶部新增一个版本信息
     * 同时要后端把 info.pageInfo 和当前时间戳 存储起来,下次刷新时候获取,并且塞入到 versionInit 可以显示版本快照信息
     */
    onSave?: (info?: string) => void

    /**
     * 工具栏:是否只显示定制组件
     */
    isHideCustomComponents?: boolean

    /**
     * is for react-native?
     */
    isReactNative?: boolean
}

export class PropsGaea {
    gaeaName = '盖亚'
    gaeaIcon = 'square-o'
    gaeaUniqueKey = 'nt-editor-gaea'
}

export class Props extends PropsGaea implements PropsDefine {
    title = 'GaeaEditor'
    version = '0.0.0'
    customComponents = [] as Array<React.ComponentClass<FitGaea.ComponentProps>>
    isHideCustomComponents = false
    height = 450
    onSave = ()=> {
    }
    versionInit = (saveVersion: Function)=> {
        saveVersion([] as any, false)
    }
    onOnlineModalShow = (callback: any)=> {
        callback([] as any)
    }
    onOnlineClick = (key: string|number)=> {

    }
    onLoadMoreVersionClick = ()=> {
    }
    onPublish = ()=> {
    }
    getSourceFileList = (folderId: string, callback: (lists: Array<FitGaea.SourceFile>)=>void)=> {
        // get fileList by folderId
        const fileList: Array<FitGaea.SourceFile> = [] as any
        // run callback
        callback(fileList)
    }
    addSourceFile = (folderId?: string, fileInfo?: FitGaea.SourceFile, addSuccess?: ()=>void)=> {
        addSuccess()
    }
    isReactNative = false
}

export interface StateDefine {

}

export class State implements StateDefine {

}
                