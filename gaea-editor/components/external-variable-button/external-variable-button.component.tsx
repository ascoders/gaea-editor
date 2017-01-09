import * as React from 'react'
import * as typings from './external-variable-button.type'
import * as classNames from 'classnames'

import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager'
import { Tooltip } from '../../../../../web-common/tooltip/index'
import { autoBindMethod } from '../../../../../common/auto-bind/index'

import './external-variable-button.scss'

@EditorManager.observer(['ApplicationAction', 'ApplicationStore'])
export default class ExternalVariable extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    static position = 'leftBarTop'

    @autoBindMethod handleClick() {
        this.props.ApplicationAction.toggleLeftBar('externalVariable')
    }

    render() {
        const classes = classNames({
            '_namespace': true,
            'active': this.props.ApplicationStore.leftBarType === 'externalVariable'
        })

        return (
            <Tooltip title="外部传参设置">
                <div className={classes}
                    onClick={this.handleClick}>
                    <i className="fa fa-ravelry" />
                </div>
            </Tooltip>
        )
    }
}