import * as React from 'react'
import Setting from '../../../store/setting'
import Viewport from '../../../store/viewport'
import Application from '../../../store/application'

export interface PropsDefine {
    setting?: Setting
    viewport?: Viewport
    application?: Application
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 是否显示
     */
    show?: boolean

    name?: string
    type?: string
}

export class State implements StateDefine {
    show = false
    name = ''
    type = 'number'
}