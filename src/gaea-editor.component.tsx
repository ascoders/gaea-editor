import { Provider } from "dob-react"
import * as React from "react"
import { BoxEditor } from "./components/box-editor/src/"
import GaeaComponents from "./gaea-components"
import { Props, State } from "./gaea-editor.type"
import Page from "./page/page.component"
import { IActionsOrStores, Store } from "./stores"

// tslint:disable-next-line:no-submodule-imports
import "antd/dist/antd.css"

import crumbs from "./plugins/crumbs"
import dragMenu from "./plugins/drag-menu"
import dragMenuButton from "./plugins/drag-menu-button"
import mainTool from "./plugins/main-tool"
import mainToolEditor from "./plugins/main-tool-editor"
import mainToolEditorEvent from "./plugins/main-tool-editor-event"
import mainToolEditorEventAction from "./plugins/main-tool-editor-event-action"
import mainToolEditorEventTrigger from "./plugins/main-tool-editor-event-trigger"
import mainToolEditorManager from "./plugins/main-tool-editor-manager"
import mainToolEditorTypeArray from "./plugins/main-tool-editor-type-array"
import mainToolEditorTypeBoolean from "./plugins/main-tool-editor-type-boolean"
import mainToolEditorTypeBoxEditor from "./plugins/main-tool-editor-type-box-editor"
import mainToolEditorTypeColor from "./plugins/main-tool-editor-type-color"
import mainToolEditorTypeDisplay from "./plugins/main-tool-editor-type-display"
import mainToolEditorTypeNumber from "./plugins/main-tool-editor-type-number"
import mainToolEditorTypeObject from "./plugins/main-tool-editor-type-object"
import mainToolEditorTypeSelect from "./plugins/main-tool-editor-type-select"
import mainToolEditorTypeString from "./plugins/main-tool-editor-type-string"
import mainToolEditorVariable from "./plugins/main-tool-editor-variable"
import mainToolTree from "./plugins/main-tool-tree"
import page from "./plugins/page"
import pageAddFolder from "./plugins/page-add-folder"
import pageAddPage from "./plugins/page-add-page"
import pageButton from "./plugins/page-button"
import preview from "./plugins/preview"
import save from "./plugins/save"
import viewportGuideline from "./plugins/viewport-guideline"

// plug-in plugins
const builtInPlugins: IPlugin[] = [
    crumbs,
    dragMenu,
    dragMenuButton,
    mainTool,
    mainToolEditor,
    mainToolEditorEvent,
    mainToolEditorEventAction,
    mainToolEditorEventTrigger,
    mainToolEditorManager,
    mainToolEditorTypeArray,
    mainToolEditorTypeBoolean,
    mainToolEditorTypeBoxEditor,
    mainToolEditorTypeColor,
    mainToolEditorTypeDisplay,
    mainToolEditorTypeNumber,
    mainToolEditorTypeObject,
    mainToolEditorTypeSelect,
    mainToolEditorTypeString,
    mainToolEditorVariable,
    mainToolTree,
    page,
    pageAddFolder,
    pageAddPage,
    pageButton,
    preview,
    save,
    viewportGuideline
]

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
        this.props.componentClasses.concat(GaeaComponents).forEach(componentClass => {
            // 添加 componentClass
            this.stores.getStore().actions.ApplicationAction.addComponentClass(componentClass)
        })

        // 监听触发 onXX 的回调，用于直接触发组件层级的回调
        this.stores.getStore().actions.EventAction.on(this.stores.getStore().stores.EventStore.emitEditorCallback, this.handleCallback)

        // 根据默认值设置页面初始属性
        if (this.props.defaultValue) {
            this.stores.getStore().actions.ApplicationAction.initApplication(this.props.defaultValue)
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
        const allComponentClasses = this.props.componentClasses.concat(GaeaComponents)

        return (
            <Provider {...this.stores.getStore() }>
                <Page componentClasses={allComponentClasses} />
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
