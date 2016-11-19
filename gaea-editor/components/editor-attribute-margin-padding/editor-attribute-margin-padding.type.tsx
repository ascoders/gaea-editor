import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

export interface PropsDefine {
    viewport ?: EditorManager.ViewportStore
    application ?: EditorManager.ApplicationStore

    editInfo?: FitGaea.ComponentPropsGaeaEdit
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}