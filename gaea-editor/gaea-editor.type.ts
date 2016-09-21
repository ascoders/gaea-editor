import * as React from 'react'
import {TransparentlyPropsPropsDefine} from '../../../common/transparently-props/index'

export interface PropsDefine extends TransparentlyPropsPropsDefine {

}

export class PropsGaea {
    gaeaName = '盖亚'
    gaeaIcon = 'square-o'
    gaeaUniqueKey = 'nt-editor-gaea'
}

export class Props extends PropsGaea implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}
                