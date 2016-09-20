import * as React from 'react'
import * as typings from './gaea-editor.type'
import * as classNames from 'classnames'

export default class GaeaEditor extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    render() {
        const classes = classNames({
            '_namespace': true,
            [this.props.className]: !!this.props.className
        })

        return (
            <div className={classes}>
                盖亚
            </div>
        )
    }
}
                