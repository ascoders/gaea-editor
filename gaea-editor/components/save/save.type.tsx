import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import GlobalSettingAction from '../global-setting/action'

export interface PropsDefine {
    application?: EditorManager.ApplicationStore
    ViewportAction?: EditorManager.ViewportAction
    GlobalSettingAction?: GlobalSettingAction
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}