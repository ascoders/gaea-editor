import * as React from 'react'
import * as typings from './external-variable-editor.type'
import * as classNames from 'classnames'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { Tooltip } from '../../../../../web-common/tooltip/index'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import Action from './action'
import Store from './store'

import './external-variable-editor.scss'

@EditorManager.observer(['ViewportStore'])
export default class ExternalVariableEditor extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = ''
    static Action = Action
    static Store = Store

    render() {
        return (
            <div className="_namespace">
                555
            </div>
        )
    }
}