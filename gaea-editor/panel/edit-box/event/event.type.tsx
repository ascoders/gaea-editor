import * as React from 'react'
import Application from '../../../store/application'
import Viewport from '../../../store/viewport'

export interface PropsDefine {
    viewport?: Viewport
    application?: Application
}

export class Props implements PropsDefine {

}

export interface StateDefine {
    /**
     * 是否展开了 web native 分开配置
     */
    isExpend?: boolean
    /**
     * 单独编辑是哪一类 web or native
     */
    editType?: string
}

export class State implements StateDefine {
    editType = 'web'
}