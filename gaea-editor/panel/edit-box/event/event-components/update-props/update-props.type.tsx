import * as React from 'react'
import Viewport from '../../../../../store/viewport'
import Application from '../../../../../store/application'

export interface PropsDefine {
    viewport?: Viewport
    application?: Application

    /**
     * 第几个事件
     */
    index?: number

    /**
     * 是否是 web
     */
    isWeb?: boolean
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}