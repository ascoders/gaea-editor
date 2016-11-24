import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import ExternalVariableAction from './action'
import ExternalVariableStore from './store'

export interface PropsDefine {
    ExternalVariableAction?: ExternalVariableAction
    ExternalVariableStore?: ExternalVariableStore
    ViewportStore?: EditorManager.ViewportStore
    ApplicationStore?: EditorManager.ApplicationStore
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
      * 是否显示
      */
    show?: boolean

    name?: string
    type?: string
}

export class State implements StateDefine {
    show = false
    name = ''
    type = 'number'
}