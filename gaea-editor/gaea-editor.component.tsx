import * as React from 'react'
import * as typings from './gaea-editor.type'
import { observer } from 'mobx-react'

import Provider from './utils/provider'
import Page from './page/page.component'

import {autoBindMethod} from 'nt-auto-bind'

import './gaea-editor.scss'

@observer
export default class GaeaEditor extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        // inject actions and stores
        return (
            <Provider gaeaProps={this.props}>
                <Page />
            </Provider>
        )
    }
}