import * as React from 'react'

export interface PropsDefine extends CommonModel.TransmitTransparentlyProps {

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
                