import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore
    ApplicationStore?: EditorManager.ApplicationStore
    ViewportAction?: EditorManager.ViewportAction

    editInfo?: FitGaea.ComponentPropsGaeaEdit
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 是否展开成 X Y
     */
    expand?: boolean
}

export class State implements StateDefine {

}