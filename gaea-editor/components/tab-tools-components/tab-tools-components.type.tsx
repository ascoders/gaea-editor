import * as React from 'react'
import TabToolsComponentsStore from './store'
import TabToolsComponentsAction from './action'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

export interface PropsDefine {
    TabToolsComponentsStore?: TabToolsComponentsStore
    TabToolsComponentsAction?: TabToolsComponentsAction
    ApplicationAction?: EditorManager.ApplicationAction
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}