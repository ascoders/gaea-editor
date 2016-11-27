import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import Action from './action'
import Store from './store'

export interface PropsDefine {
    ApplicationStore?: EditorManager.ApplicationStore
    GlobalSettingAction?: Action
    GlobalSettingStore?: Store
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    show?: boolean
}

export class State implements StateDefine {
    show = false
}