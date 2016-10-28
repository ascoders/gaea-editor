import * as React from 'react'
import Application from '../../../store/application'
import Viewport from '../../../store/viewport'

export interface PropsDefine {
    viewport?: Viewport
    application?: Application

    editOption?: FitGaea.ComponentPropsGaeaEdit
    index?: number
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 是否在变量模式
     */
    inVariable?: boolean
}

export class State implements StateDefine {
    inVariable = false
}