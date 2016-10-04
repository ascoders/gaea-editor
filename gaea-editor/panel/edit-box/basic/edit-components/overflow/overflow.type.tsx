import * as React from 'react'
import Viewport from '../../../../../store/viewport'

export interface PropsDefine {
    editOption?: FitGaea.ComponentPropsGaeaEdit
    viewport?: Viewport
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 是否展开成 X Y
     */
    expand?: boolean
}

export class State implements StateDefine {

}