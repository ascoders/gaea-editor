import * as React from 'react'

import Application from '../stores/application'
import ApplicationAction from '../actions/application'
import Viewport from '../stores/viewport'
import ViewportAction from '../actions/viewport'
import Event from '../stores/event'
import EventAction from '../actions/event'

export interface PropsDefine {
    application?: Application
    applicationAction?: ApplicationAction
    viewport?: Viewport
    viewportAction?: ViewportAction
    event?: Event
    eventAction?: EventAction
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}