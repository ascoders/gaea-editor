import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import Store from './store'

export interface PropsDefine {
    application?: EditorManager.ApplicationStore
    viewport?: EditorManager.ViewportStore
    copyPasteStore?: Store
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}