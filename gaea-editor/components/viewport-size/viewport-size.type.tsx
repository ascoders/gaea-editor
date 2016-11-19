import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import GlobalSettingStore from '../global-setting/store'

export interface PropsDefine {
    application?: EditorManager.ApplicationStore
    globalSettingStore?: GlobalSettingStore
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    show?: boolean
}

export class State implements StateDefine {
    show = false
}