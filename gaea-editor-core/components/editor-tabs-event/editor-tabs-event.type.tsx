import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import Store from './store'

export interface PropsDefine {
    viewport ?: EditorManager.ViewportStore
    application?: EditorManager.ApplicationStore
    eventStore?: Store
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 是否展开了 web native 分开配置
     */
    isExpend?: boolean
    /**
     * 单独编辑是哪一类 web or native
     */
    editType?: string
}

export class State implements StateDefine {
    editType = 'web'
}