import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import TabToolsVersionStore from './store'
import TabToolsVersionAction from './action'

export interface PropsDefine {
    TabToolsVersionStore?: TabToolsVersionStore
    ApplicationStore?: EditorManager.ApplicationStore
    ApplicationAction?: EditorManager.ApplicationAction
    TabToolsVersionAction?: TabToolsVersionAction
    EventStore?: EditorManager.EventStore
    EventAction?: EditorManager.EventAction
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}