import * as React from 'react'
import { Provider } from 'dynamic-react'

import { Store, ActionsOrStores } from './stores'
import Page from './page/page.component'

import globalSettings from './plugins/global-settings'
import { Props, State } from './gaea-editor.type'

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

        // add componentClasses to store
        this.props.componentClasses.forEach(componentClass => {
            this.stores.getStore().actions.ApplicationAction.addComponentClass(componentClass)
        })
    }

    render() {
        return (
            <Provider {...this.stores.getStore() }>
                <Page />
            </Provider>
        )
    }
}