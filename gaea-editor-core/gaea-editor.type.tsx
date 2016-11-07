import * as React from 'react'

export interface PropsDefine {
    /**
     * 插件列表
     */
    plugins?: Array<FitGaea.Plugin>

    /**
     * 通用组件
     */
    commonComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>

    /**
     * 自定义组件
     */
    customComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>

    [x: string]: any
}

export class Props implements PropsDefine {
    plugins = [] as Array<FitGaea.Plugin>
    commonComponents = [] as Array<React.ComponentClass<FitGaea.ComponentProps>>
    customComponents = [] as Array<React.ComponentClass<FitGaea.ComponentProps>>
}

export interface StateDefine {

}

export class State implements StateDefine {

}