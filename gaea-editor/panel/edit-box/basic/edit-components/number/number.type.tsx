import * as React from 'react'
import Viewport from '../../../../../store/viewport'

export interface PropsDefine {
    editOption?: FitGaea.ComponentPropsGaeaEdit
    viewport?: Viewport
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    unit?: string
}

export class State implements StateDefine {
    unit = ''
}