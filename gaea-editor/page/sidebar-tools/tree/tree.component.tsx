import * as React from 'react'
import * as typings from './tree.type'
import {observer, inject} from 'mobx-react'

import TreePanel from '../../../panel/tree/tree.component'

@observer
export default class Tree extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        return (
            <TreePanel/>
        )
    }
}