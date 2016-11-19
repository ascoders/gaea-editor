import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

export interface PropsDefine {
    viewport ?: EditorManager.ViewportStore

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