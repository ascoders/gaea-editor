import * as React from 'react'
import * as EditorManager from '../../../../gaea-editor-manager/gaea-editor-manager'
import TreeAction from '../action'
import TreeStore from '../store'

export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore
    EventStore?: EditorManager.EventStore
    TreeAction?: TreeAction
    ViewportAction?: EditorManager.ViewportAction
    EventAction?: EditorManager.EventAction

    /**
     * 对应的组件信息 key
     */
    mapUniqueKey?: string
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}