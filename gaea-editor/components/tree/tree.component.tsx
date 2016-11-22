import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './tree.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import TreeNode from './tree-node/tree-node.component'
import { Tree } from '../../../../../web-common/tree/index'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import TreeAction from './action'
import TreeStore from './store'
import Guideline from './guideline/guideline.component'

import './tree.scss'

@EditorManager.observer(['ViewportStore', 'ApplicationStore', 'ViewportAction', 'TreeAction'])
export default class TreePlugin extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'mainToolBottom'
    static Action = TreeAction
    static Store = TreeStore

    componentDidMount() {
        const treeContainerDom = ReactDOM.findDOMNode(this.refs['treeContainer']) as HTMLElement
        this.props.TreeAction.setTreeRootDom(treeContainerDom)
    }

    @autoBindMethod handleMouseLeave() {
        this.props.ViewportAction.setCurrentHoverComponentMapUniqueKey(null)
    }

    render() {
        if (this.props.ApplicationStore.pageValue === 'empty') {
            return null
        }

        return (
            <div className="_namespace">
                <div className="tree-container"
                    ref="treeContainer">
                    <Tree defaultExpendAll={true}
                        toggleByArrow={true}
                        onMouseLeave={this.handleMouseLeave}
                        style={{ width: '100%' }}>
                        <TreeNode mapUniqueKey={this.props.ViewportStore.rootMapUniqueKey} />
                    </Tree>
                    <Guideline />
                </div>

                <div className="absolute-container">
                    实例数:{this.props.ViewportStore.components.size}
                </div>
            </div>
        )
    }
}