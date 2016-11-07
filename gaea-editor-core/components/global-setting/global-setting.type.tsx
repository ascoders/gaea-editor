import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

export interface PropsDefine {
    application?: EditorManager.ApplicationStore
    applicationAction?: EditorManager.ApplicationAction
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    show?: boolean
}

export class State implements StateDefine {
    show = false
}