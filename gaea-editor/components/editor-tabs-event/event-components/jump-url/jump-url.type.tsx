import * as React from 'react'
import * as EditorManager from '../../../../../gaea-editor-manager/gaea-editor-manager'

export interface PropsDefine {
    viewport?: EditorManager.ViewportStore

    /**
     * 第几个事件
     */
    index?: number

    /**
     * 是否是 web
     */
    isWeb?: boolean
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}