import * as React from 'react'
import Viewport from '../../../../../store/viewport'
import Application from '../../../../../store/application'

export interface PropsDefine {
    color?: string
    onChange?: (color?: any)=>void
    onChangeComplete?: (color?: any)=>void

    absoluteStyle?: React.CSSProperties

    viewport?: Viewport
    application?: Application
}

export class Props implements PropsDefine {
    onChange = ()=> {
    }
    onChangeComplete = ()=> {
    }
}

export interface StateDefine {
    /**
     * 是否显示颜色编辑器
     */
    displayColorPicker?: boolean
}

export class State implements StateDefine {
    displayColorPicker = false
}