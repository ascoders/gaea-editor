import * as React from 'react'
import ApplicationStore from '../../../stores/application'
import ViewportStore from '../../../stores/viewport'
import EventStore from '../../../stores/event'

export interface PropsDefine {
    /**
     * store map 中的唯一 id
     */
    mapUniqueKey ?: string

    application?: ApplicationStore
    viewport?: ViewportStore
    event?: EventStore
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}