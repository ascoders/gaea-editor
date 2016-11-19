import * as React from 'react'
import EventStore from '../../stores/event'
import ViewportStore from '../../stores/viewport'
import ApplicationStore from '../../stores/application'

export interface PropsDefine {
    viewport?: ViewportStore
    event?: EventStore
    application?: ApplicationStore
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}