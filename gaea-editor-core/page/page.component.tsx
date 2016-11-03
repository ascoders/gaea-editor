import * as React from 'react'
import * as typings from './page.type'

import {observer} from 'mobx-react'

import {autoBindMethod} from '../../../../common/auto-bind/index'

import './page.scss'

@observer(['application'])
export default class Page extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        return (
            <div>page</div>
        )
    }
}