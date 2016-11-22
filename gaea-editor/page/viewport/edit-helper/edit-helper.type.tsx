import * as React from 'react'
import ApplicationStore from '../../../stores/application'
import ViewportStore from '../../../stores/viewport'
import EventStore from '../../../stores/event'
import ApplicationAction from '../../../actions/application'
import EventAction from '../../../actions/event'
import ViewportAction from '../../../actions/viewport'

export interface PropsDefine {
    /**
     * store map 中的唯一 id
     */
    mapUniqueKey ?: string

    ApplicationStore?: ApplicationStore
    ViewportStore?: ViewportStore
    EventStore?: EventStore
    ApplicationAction?: ApplicationAction
    ViewportAction?: ViewportAction
    EventAction?: EventAction
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}