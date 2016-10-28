import * as React from 'react'
import Viewport from '../../../../../store/viewport'
import Application from '../../../../../store/application'
import Setting from '../../../../../store/setting'

export interface PropsDefine {
    editOption?: FitGaea.ComponentPropsGaeaEdit
    viewport?: Viewport
    application?: Application
    setting?: Setting

    /**
     * 当前绑定的变量
     */
    variable?: FitGaea.VariableData
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 是否出现选择变量的弹出层
     */
    show?: boolean
}

export class State implements StateDefine {
    show = false
}