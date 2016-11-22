import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore
    ViewportAction?: EditorManager.ViewportAction

    editInfo?: FitGaea.ComponentPropsGaeaEdit
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    unit?: string
}

export class State implements StateDefine {
    unit = ''
}