import * as React from 'react'
import Viewport from '../../../../store/viewport'
import Setting from '../../../../store/setting'

export interface PropsDefine {
    viewport?: Viewport
    setting?: Setting
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    show?: boolean
}

export class State implements StateDefine {
    show = false
}