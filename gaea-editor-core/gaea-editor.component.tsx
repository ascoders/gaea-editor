import * as React from 'react'
import * as typings from './gaea-editor.type'

import Provider from './utils/provider'
import Page from './page/page.component'

import {autoBindMethod} from '../../../common/auto-bind/index'

import './gaea-editor.scss'

export default class GaeaEditor extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        // 注入 actions 与 stores
        return (
            <Provider>
                <Page/>
            </Provider>
        )
    }
}