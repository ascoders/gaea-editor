import * as React from 'react'
import Viewport from '../../../store/viewport'
import Application from '../../../store/application'

export interface PropsDefine {
    viewport?: Viewport
    application?: Application

    /**
     * viewport.components 中的唯一 key
     */
    mapUniqueKey?: string
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 是否被选中
     */
    selected?: boolean
}

export class State implements StateDefine {
    selected = false
}