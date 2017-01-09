import * as React from 'react'
import * as typings from './left-bar.type'
import { observer } from 'mobx-react'
import * as _ from 'lodash'

import { autoBindMethod } from 'nt-auto-bind'

import './left-bar.scss'

@observer(['ApplicationStore', 'ApplicationAction'])
export default class LeftBar extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        if (this.props.ApplicationStore.leftBarType === null) {
            return null
        }

        return (
            <div className="_namespace">
                {this.props.ApplicationAction.loadingPluginByPosition('leftBar' + _.upperFirst(this.props.ApplicationStore.leftBarType))}
            </div>
        )
    }
}