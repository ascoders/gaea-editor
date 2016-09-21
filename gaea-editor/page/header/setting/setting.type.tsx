import * as React from 'react'
import Setting from '../../../store/setting'

export interface PropsDefine {
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