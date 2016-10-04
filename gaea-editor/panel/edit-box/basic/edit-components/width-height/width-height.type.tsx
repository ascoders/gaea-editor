import * as React from 'react'
import Viewport from '../../../../../store/viewport'

export interface PropsDefine {
    editOption?: FitGaea.ComponentPropsGaeaEdit
    viewport?: Viewport
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    width?: string
    minWidth?: string
    maxWidth?: string
    height?: string
    minHeight?: string
    maxHeight?: string
    [x: string]: any
}

export class State implements StateDefine {

}