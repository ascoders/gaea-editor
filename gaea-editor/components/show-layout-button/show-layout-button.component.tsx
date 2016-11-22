import * as React from 'react'
import * as typings from './show-layout-button.type'
import * as classNames from 'classnames'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './show-layout-button.scss'

@EditorManager.observer(['ViewportStore', 'ViewportAction'])
export default class ShowLayoutButton extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'navbarLeftBottom'

    @autoBindMethod handleClick() {
        this.props.ViewportAction.setLayoutComponentActive(!this.props.ViewportStore.isLayoutComponentActive)
    }

    render() {
        const classes = classNames({
            '_namespace': true,
            'active': this.props.ViewportStore.isLayoutComponentActive
        })

        return (
            <div className={classes}
                onClick={this.handleClick}>
                <i className="fa fa-eye" />
            </div>
        )
    }
}