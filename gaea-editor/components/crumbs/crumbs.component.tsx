import * as React from 'react'
import * as typings from './crumbs.type'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import { autoBindMethod } from 'nt-auto-bind'

import './crumbs.scss'

@EditorManager.observer(['ViewportStore', 'ViewportAction'])
export default class Crumbs extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'bottomBar'

    @autoBindMethod handleClick(mapUniqueKey: string) {
        this.props.ViewportAction.setCurrentEditComponentMapUniqueKey(mapUniqueKey)
    }

    @autoBindMethod handleHover(mapUniqueKey: string) {
        this.props.ViewportAction.setCurrentHoverComponentMapUniqueKey(mapUniqueKey)
    }

    @autoBindMethod handleMouseLeave() {
        this.props.ViewportAction.setCurrentHoverComponentMapUniqueKey(null)
    }

    render() {
        let childs: Array<React.ReactElement<any>>

        if (this.props.ViewportStore.currentEditComponentMapUniqueKey) {
            // 递归寻找这个组件父元素
            childs = this.props.ViewportStore.currentEditComponentPath.map((mapUniqueKey, index) => {
                const componentInfo = this.props.ViewportStore.components.get(mapUniqueKey)
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