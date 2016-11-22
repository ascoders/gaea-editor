import * as React from 'react'
import * as EditorManager from '../../../../gaea-editor-manager/gaea-editor-manager'
import TabToolsComponentsComboAction from '../../tab-tools-components-combo/action'

export interface PropsDefine {
    ApplicationStore?: EditorManager.ApplicationStore
    ViewportStore?: EditorManager.ViewportStore
    ViewportAction?: EditorManager.ViewportAction
    TabToolsComponentsComboAction?: TabToolsComponentsComboAction
    ApplicationAction?: EditorManager.ApplicationAction
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