import * as React from 'react'
import * as typings from './external-variable-editor-label.type'
import * as classNames from 'classnames'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { Tooltip } from 'nt-web-tooltip'
import { autoBindMethod } from 'nt-auto-bind'

import './external-variable-editor-label.scss'

@EditorManager.observer(['ViewportStore', 'ExternalVariableEditorAction', 'ExternalVariableEditorStore'])
export default class ExternalVariableEditorLabel extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'editorLabel'

    @autoBindMethod handleUseVariable() {
        this.props.ExternalVariableEditorAction.setCurrentEditComponentVariableByField(this.props.editInfo.field, null)
        this.props.ExternalVariableEditorAction.hideCurrentEditTool(this.props.index)
    }

    @autoBindMethod handleCancelVariable() {
        this.props.ExternalVariableEditorAction.removeCurrentEditComponentVariableByField(this.props.editInfo.field)
        this.props.ExternalVariableEditorAction.showCurrentEditTool(this.props.index)
    }

    render() {
        const variable = this.props.ExternalVariableEditorStore.variables.get(this.props.ViewportStore.currentEditComponentMapUniqueKey + '_' + this.props.editInfo.field)

        if (variable === undefined) {
            return (
                <Tooltip title="点击使用变量">
                    <div className="_namespace" onClick={this.handleUseVariable}>
                        <i className="fa fa-ravelry" />
                    </div>
                </Tooltip>
            )
        } else {
            return (
                <Tooltip title="点击使用常量">
                    <div className="_namespace" onClick={this.handleCancelVariable}>
                        <i className="fa fa-font" />
                    </div>
                </Tooltip>
            )
        }
    }
}




// let obj = {
//     a: 1,
//     b: {
//         c: 2
//     },
//     d: [] as any,
//     e: [1, 2],
//     f: function () { }
// }

// let proxyHandle: ProxyHandler<any> = {
//     set: (target, key, value, receiver) => {
//         console.log('set', target, key, value, receiver)
//         return Reflect.set(target, key, value, receiver)
//     },
//     get: (target, key, receiver) => {
//         console.log('get', target, key, receiver)
//         var result = Reflect.get(target, key, receiver)
//         return result
//     }
// }

// const isObj = (obj: Object) => {
//     return obj !== null && typeof obj === 'object'
// }

// const observer = (obj: any) => {
//     if (!isObj(obj)) {
//         return obj
//     }

//     Object.keys(obj).forEach(key => {
//         obj[key] = observer(obj[key])
//     })

//     return new Proxy(obj, proxyHandle)
// }

// let proxyObj = observer(obj)

// proxyObj.b.c = 3