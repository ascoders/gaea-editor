import * as React from 'react'
import * as typings from './source.type'
import {observer, inject} from 'mobx-react'

@observer
export default class Source extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        return (
            <div>

            </div>
        )
    }
}