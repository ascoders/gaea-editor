import * as React from 'react'
import * as EditorManager from '../../../../../gaea-editor-manager/gaea-editor-manager'
import Store from '../../store'
import Action from '../../action'

export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore
    ViewportAction?: EditorManager.ViewportAction
    ApplicationAction?: EditorManager.ApplicationAction
    EditorEventAction?: Action
    EditorEventStore?: Store

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