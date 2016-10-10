import * as React from 'react'
import * as typings from './template.type'
import {observer, inject} from 'mobx-react'

import WebTemplate from './web/web.component'
import NativeTemplate from './native/native.component'

import './template.scss'

@inject('setting', 'viewport', 'application') @observer
export default class Template extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        return (
            <div className="_namespace">
                <div className="title">布局</div>
                {this.props.application.isReactNative ? <NativeTemplate/> : <WebTemplate/>}
            </div>
        )
    }
}