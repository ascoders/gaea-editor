import * as React from 'react'
import ViewportAction from '../../actions/viewport'
import EventAction from '../../actions/event'
import EventStore from '../../stores/event'
import ViewportStore from '../../stores/viewport'
import ApplicationAction from '../../actions/application'
import ApplicationStore from '../../stores/application'

export interface PropsDefine {
    viewportAction?: ViewportAction
    viewport?: ViewportStore
    eventAction?: EventAction
    event?: EventStore
    application?: ApplicationStore
    applicationAction?: ApplicationAction
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}