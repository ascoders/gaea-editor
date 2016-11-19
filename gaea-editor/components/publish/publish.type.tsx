import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import Store from './store'

export interface PropsDefine {
    application?: EditorManager.ApplicationStore
    publishStore?: Store
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    show?: boolean
    selectedVersion?: string
}

export class State implements StateDefine {
    show = false
}