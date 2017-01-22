import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore
    ViewportAction?: EditorManager.ViewportAction
    ApplicationStore?: EditorManager.ApplicationStore
    ApplicationAction?: EditorManager.ApplicationAction

    index?: number
    editInfo?: FitGaea.ComponentPropsGaeaEdit
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 是否选中了上下左右边框
     */
    selectLeft?: boolean
    selectTop?: boolean
    selectRight?: boolean
    selectBottom?: boolean
}

export class State implements StateDefine {
    selectLeft = true
    selectTop = true
    selectRight = true
    selectBottom = true
}