import * as React from 'react'
import * as typings from './script.type'
import {observer, inject} from 'mobx-react'

import {ButtonGroup, Button} from '../../../../../../web-common/button/index'
import {autoBindMethod} from '../../../../../../common/auto-bind/index'

// 只有在前端才会引用 codeMirror
let Codemirror: any = {}
if (window) {
    Codemirror = require('react-codemirror')
    require('codemirror/lib/codemirror.css')
    require('codemirror/mode/javascript/javascript')
}

const defaultValue = _.trim(`
/**
 * 初始化函数,在组件创建时系统自动调用
 */
function componentWillMount() {

}

/**
 * 初始化函数,在组件 DOM 节点创建后系统自动调用
 */
function componentDidMount() {

}

/**
 * 析构函数,在组件销毁时系统自动调用
 */
function componentWillUnmount() {

}
`)

const codeMirrorOpts = {
    lineNumbers: true,
    readOnly: false,
    mode: 'javascript',
    theme: 'default',
    tabSize: 2
}

@observer
export default class EditBoxScript extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    handleCodeChange() {

    }

    render() {
        return (
            <div className="_namespace">
                <Codemirror onChange={this.handleCodeChange}
                            defaultValue={defaultValue}
                            options={codeMirrorOpts}/>
                <ButtonGroup>
                    <Button active>test</Button>
                </ButtonGroup>
            </div>
        )
    }
}