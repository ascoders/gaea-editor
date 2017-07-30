import { Provider } from "dynamic-react"
import gaeaBasicComponents from "gaea-basic-components"
import * as React from "react"
import { BoxEditor } from "./components/box-editor/src/"
import { Props, State } from "./gaea-editor.type"
import Page from "./page/page.component"
import { IActionsOrStores, Store } from "./stores"

// 所有内置插件
const builtInPlugins: IPlugin[] = []

declare const require: any
const context = require.context("./plugins", true, /index\.(tsx|js)$/)
context.keys().forEach((key: string) => {
    builtInPlugins.push(context(key).default)
})

export default class GaeaEditor extends React.Component<Props, State> {
    public static defaultProps = new Props()
    public state = new State()

    private stores = new Store()
    private pluginStores = {}

    public componentWillMount() {
        // 收集插件, 后续用来在不同地方展示
        builtInPlugins.concat(this.props.plugins).forEach((plugin) => {
            this.stores.getStore().actions.ApplicationAction.addPlugin(plugin)

            // 注入插件数据流
            if (plugin.actions) {
                this.stores.addActions(plugin.actions)
            }

            if (plugin.stores) {
                this.stores.addStores(plugin.stores)
            }
        })

        // 将默认组件与用户自定义组件的 Class 保存在数据流
        gaeaBasicComponents.concat(this.props.componentClasses).forEach(componentClass => {
            // 添加 componentClass
            this.stores.getStore().actions.ApplicationAction.addComponentClass(componentClass)
        })

        // 监听触发 onXX 的回调，用于直接触发组件层级的回调
        this.stores.getStore().actions.EventAction.on(this.stores.getStore().stores.EventStore.emitEditorCallback, this.handleCallback)

        // 根据默认值设置页面初始属性
        if (this.props.value) {
            this.stores.getStore().actions.ApplicationAction.initApplication(this.props.value)
        } else {
            // 初始化一个空页面
            this.stores.getStore().actions.ViewportAction.initViewport()
        }

        // 将 onComponentDragStart 放到 applicationStore
        this.stores.getStore().actions.ApplicationAction.setOnComponentDragStart(this.props.onComponentDragStart)
    }

    public componentWillUnmount() {
        this.stores.getStore().actions.EventAction.off(this.stores.getStore().stores.EventStore.emitEditorCallback, this.handleCallback)
    }

    public render() {
        return (
            <Provider {...this.stores.getStore() }>
                <Page componentClasses={this.props.componentClasses} />
            </Provider>
        )
    }

    private handleCallback = (_: any, params: any) => {
        const func = (this.props as any)[params.funcName]
        if (typeof func === "function") {
            func(params.data)
        }
    }
}
