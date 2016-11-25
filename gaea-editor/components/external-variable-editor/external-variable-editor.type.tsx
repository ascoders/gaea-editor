import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import ExternalVariableEditorAction from '../external-variable-editor/action'
import ExternalVariableEditorStore from '../external-variable-editor/store'
import ExternalVariableStore from '../external-variable/store'

export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore
    ExternalVariableEditorAction?: ExternalVariableEditorAction
    ExternalVariableEditorStore?: ExternalVariableEditorStore
    ExternalVariableStore?: ExternalVariableStore

    index?: number
    editInfo?: FitGaea.ComponentPropsGaeaEdit
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 是否出现选择变量的弹出层
     */
    show?: boolean

}

export class State implements StateDefine {
    show = false
}