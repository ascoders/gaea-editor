import * as React from 'react'

export interface PropsDefine {
    color?: string
    onChange?: (color?: any)=>void
    onChangeComplete?: (color?: any)=>void
}

export class Props implements PropsDefine {
    onChange = ()=> {
    }
    onChangeComplete = ()=> {
    }
}

export interface StateDefine {

}

export class State implements StateDefine {

}