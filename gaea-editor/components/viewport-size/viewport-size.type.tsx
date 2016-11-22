import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import GlobalSettingAction from '../global-setting/action'
import GlobalSettingStore from '../global-setting/store'

export interface PropsDefine {
    ApplicationStore?: EditorManager.ApplicationStore
    GlobalSettingStore?: GlobalSettingStore
    GlobalSettingAction?: GlobalSettingAction
    ViewportAction?: EditorManager.ViewportAction
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    show?: boolean
}

export class State implements StateDefine {
    show = false
}