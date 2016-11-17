import * as React from 'react'
import * as EditorManager from '../../../../gaea-editor-manager/gaea-editor-manager'

export interface PropsDefine {
    application?: EditorManager.ApplicationStore
    viewport?: EditorManager.ViewportStore
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    show?: boolean
    templateName?: string
}

export class State implements StateDefine {
    show = false
    templateName = '模板1'
}