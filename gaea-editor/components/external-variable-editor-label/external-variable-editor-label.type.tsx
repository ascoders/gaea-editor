import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import ExternalVariableEditorAction from '../external-variable-editor/action'

export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore
    ExternalVariableEditorAction?: ExternalVariableEditorAction

    editInfo?: FitGaea.ComponentPropsGaeaEdit
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}