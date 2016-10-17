import * as React from 'react'
import ApplicationStore from '../store/application'
import ViewportStore from '../store/viewport'
import SettingStore from '../store/setting'

export interface PropsDefine {
    viewport?: ViewportStore
    application?: ApplicationStore
    setting?: SettingStore

    /**
     * 页面信息
     */
    value?: string
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}