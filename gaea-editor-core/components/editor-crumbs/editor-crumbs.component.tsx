import * as React from 'react'
import * as typings from './editor-crumbs.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import {autoBindMethod} from '../../../../../common/auto-bind/index'

import './editor-crumbs.scss'

@EditorManager.observer(['viewport'])
export default class EditorCrumbs extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarBottom'

    @EditorManager.lazyInject(EditorManager.ViewportAction) private viewportAction: EditorManager.ViewportAction

    @autoBindMethod handleClick(mapUniqueKey: string) {
        this.viewportAction.setCurrentEditComponentMapUniqueKey(mapUniqueKey)
    }

    @autoBindMethod handleHover(mapUniqueKey: string) {
        this.viewportAction.setCurrentHoverComponentMapUniqueKey(mapUniqueKey)
    }

    @autoBindMethod handleMouseLeave() {
        this.viewportAction.setCurrentHoverComponentMapUniqueKey(null)
    }

    render() {
        let childs: Array<React.ReactElement<any>>

        if (this.props.viewport.currentEditComponentMapUniqueKey) {
            // 递归寻找这个组件父元素
            childs = this.props.viewport.currentEditComponentPath.map((mapUniqueKey, index)=> {
                const componentInfo = this.props.viewport.components.get(mapUniqueKey)
                return (
                    <div onClick={this.handleClick.bind(this, mapUniqueKey)}
                         onMouseOver={this.handleHover.bind(this, mapUniqueKey)}
                         className="footer-item"
                         key={index}>
                        {componentInfo.props.gaeaName}

                        <div className="right-icon-container">
                            <div className="right-icon"></div>
                        </div>
                    </div>
                )
            })
        }

        return (
            <div className="_namespace">
                <div className="auto-width-container"
                     onMouseLeave={this.handleMouseLeave}>
                    {childs}
                </div>
            </div>
        )
    }
}