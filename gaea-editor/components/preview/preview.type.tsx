import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

export interface PropsDefine {
    ApplicationStore?: EditorManager.ApplicationStore
    ApplicationAction?: EditorManager.ApplicationAction
    ViewportAction?: EditorManager.ViewportAction
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    show?: boolean
}

export class State implements StateDefine {
    show = false
}