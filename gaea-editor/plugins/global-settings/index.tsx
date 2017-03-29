import * as React from 'react'
import { Connect } from 'dynamic-react'

import { StoreProps } from '../../stores'
import * as store from './store'

export class Props extends StoreProps {

}

export class State {

}

@Connect
class GlobalSetting extends React.Component<Props, State> {
    static defaultProps = new Props()
    public state = new State()

    componentWillMount() {

    }

    render() {
        return (
            <div>
                全局设置
            </div>
        )
    }
}

export default {
    position: 'navbarLeft',
    component: GlobalSetting,
    actions: {
        GlobalSettingAction: store.GlobalSettingsAction
    },
    stores: {
        GlobalSettingsStore: store.GlobalSettingsStore
    }
} as Plugin