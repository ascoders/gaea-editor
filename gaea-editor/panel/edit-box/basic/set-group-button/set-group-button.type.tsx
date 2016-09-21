import * as React from 'react'
import Viewport from '../../../../store/viewport'
import Application from '../../../../store/application'

export interface PropsDefine {
    viewport?: Viewport
    application?: Application
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 是否显示设置组合名的模态框
     */
    show?: boolean
    /**
     * 组合名
     */
    name?: string
}

export class State implements StateDefine {
    show = false
}