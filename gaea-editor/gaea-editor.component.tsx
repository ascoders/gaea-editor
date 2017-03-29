import * as React from 'react'
import { Provider } from 'dynamic-react'

import { Store, ActionsOrStores } from './stores'
import Page from './page/page.component'

import globalSettings from './plugins/global-settings'

export class Props {
}

export class State {
}

export default class GaeaEditor extends React.Component<Props, State> {
    static defaultProps = new Props()
    public state = new State()

    private stores = new Store()
    private pluginStores = {}

    componentWillMount() {
        // 收集插件, 后续用来在不同地方展示
        this.stores.getStore().actions.ApplicationAction.addPlugin(globalSettings)

        // 注入插件数据流
        this.stores.addActions(globalSettings.actions)
        this.stores.addStores(globalSettings.stores)
    }

    render() {
        return (
            <Provider {...this.stores.getStore() }>
                <Page />
            </Provider>
        )
    }
}