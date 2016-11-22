import * as React from 'react'
import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import EventStore from '../editor-tabs-event/store'

export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore
    EventStore?: EventStore
    ApplicationAction?: EditorManager.ApplicationAction
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}