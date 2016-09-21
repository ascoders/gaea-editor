import * as React from 'react'
import * as typings from './tree-move-box.type'
import {observer, inject} from 'mobx-react'

import './tree-move-box.scss'

@inject('viewport') @observer
export default class Tree extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        if (this.props.viewport.isMovingComponent || !this.props.viewport.treeHoverComponentSpec.hovering) {
            return null
        }

        const style = {
            left: this.props.viewport.treeHoverComponentSpec.left,
            top: this.props.viewport.treeHoverComponentSpec.top,
            width: this.props.viewport.treeHoverComponentSpec.width,
            height: this.props.viewport.treeHoverComponentSpec.height,
        }

        return (
            <div className="_namespace"
                 style={style}/>
        )
    }
}