import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import TabToolsComponentsStore from './store'
import TabToolsComponentsAction from './action'

export interface PropsDefine {
    applicationAction?: EditorManager.ApplicationAction
    tabToolsComponentsStore?: TabToolsComponentsStore
    tabToolsComponentsAction?: TabToolsComponentsAction
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}