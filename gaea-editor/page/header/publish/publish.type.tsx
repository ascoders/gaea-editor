import * as React from 'react'
import Application from '../../../store/application'
import Setting from '../../../store/setting'
import Viewport from '../../../store/viewport'

export interface PropsDefine {
    setting?: Setting
    application?: Application
    viewport?: Viewport
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    show?: boolean
    selectedVersion?: string
}

export class State implements StateDefine {
    show = false
}