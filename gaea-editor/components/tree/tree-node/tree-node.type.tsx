import * as React from 'react'
import * as EditorManager from '../../../../gaea-editor-manager/gaea-editor-manager'

export interface PropsDefine {
    viewport?: EditorManager.ViewportStore
    event?: EditorManager.EventStore

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