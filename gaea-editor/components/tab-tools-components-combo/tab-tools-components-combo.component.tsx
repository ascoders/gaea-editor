import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './tab-tools-components-combo.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'


import Action from './action'
import Store from './store'

import {autoBindMethod} from '../../../../../common/auto-bind/index'

import './tab-tools-components-combo.scss'

@EditorManager.observer(['ApplicationStore', 'TabToolsComponentsComboStore', 'ViewportAction'])
export default class TabToolsComponentsCombo extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'tabToolsComponentsCombo'
    static Action = Action
    static Store = Store

    componentDidMount() {
        this.props.ViewportAction.registerOuterDrag(ReactDOM.findDOMNode(this) as HTMLElement)
    }

    render() {
        const CommonDraggableItems = this.props.TabToolsComponentsComboStore.comboList.map((combo, index) => {
            return (
                <div key={index}
                     data-source={combo.source}
                     className="component-draggable-item">
                    {combo.name}
                </div>
            )
        })

        return (
            <div className="_namespace">
                {CommonDraggableItems}
            </div>
        )
    }
}