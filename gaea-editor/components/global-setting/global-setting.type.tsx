import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import Action from './action'

export interface PropsDefine {
    ApplicationStore?: EditorManager.ApplicationStore
    GlobalSettingAction?: Action
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    show?: boolean
}

export class State implements StateDefine {
    show = false
}