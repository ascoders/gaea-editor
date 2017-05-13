import { Provider } from "dynamic-react"
import gaeaBasicComponents from "gaea-basic-components"
import * as React from "react"
import { Props, State } from "./gaea-editor.type"
import Page from "./page/page.component"
import { IActionsOrStores, Store } from "./stores"

// 所有插件
const plugins: IPlugin[] = []

const context = require.context("./plugins", true, /index\.(tsx|js)$/)
context.keys().forEach((key: string) => {
    plugins.push(context(key).default)
})

export default class GaeaEditor extends React.Component<Props, State> {
    public static defaultProps = new Props()
    public state = new State()

    private stores = new Store()
    private pluginStores = {}

    public componentWillMount() {
        // 收集插件, 后续用来在不同地方展示
        plugins.concat(this.props.plugins).forEach((plugin) => {
            this.stores.getStore().actions.ApplicationAction.addPlugin(plugin)

            // 注入插件数据流
            if (plugin.actions) {
                this.stores.addActions(plugin.actions)
            }

            if (plugin.stores) {
                this.stores.addStores(plugin.stores)
            }
        })

        // add gaea-basic-components
        // add componentClasses to store
        gaeaBasicComponents.concat(this.props.componentClasses).forEach(componentClass => {
            this.stores.getStore().actions.ApplicationAction.addComponentClass(componentClass)
        })
    }

    public render() {
        return (
            <Provider {...this.stores.getStore() }>
                <Page componentClasses={this.props.componentClasses} />
            </Provider>
        )
    }
}
