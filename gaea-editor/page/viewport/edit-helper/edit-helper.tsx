import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as classNames from 'classnames'
import { Connect } from 'dynamic-react'

import { StoreProps } from '../../../stores'

class Props extends StoreProps {
    /**
     * 实例唯一的 key
     */
    instanceKey?: string
}

class State {

}

import {

} from './edit-helper.style'

@Connect
export default class EditHelper extends React.Component<Props, State> {
    static defaultProps = new Props()
    public state = new State()

    render() {
        return (
            <div>
                aaa
            </div>
        )
    }
}