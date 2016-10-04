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

    /**
     * 是否显示颜色编辑器
     */
    displayColorPicker?: boolean
}

export class State implements StateDefine {
    displayColorPicker = false
}