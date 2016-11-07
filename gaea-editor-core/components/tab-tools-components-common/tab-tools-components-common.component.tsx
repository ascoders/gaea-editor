import * as React from 'react'
import * as typings from './tab-tools-components-common.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'

import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './tab-tools-components-common.scss'

@EditorManager.observer(['application', 'viewportAction'])
export default class TabToolsComponentsCommon extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'tabToolsComponentsCommon'

    componentWillMount() {

    }

    render() {
        const CommonDraggableItems = this.props.application.editorProps.commonComponents.map((ComponentClass, index) => {
            return (
                <div key={index} className="component-item">
                    {ComponentClass.defaultProps.gaeaName}
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