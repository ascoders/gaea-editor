import { inject } from "dependency-inject"
import { Action } from "dynamic-object"
import * as React from "react"
import ApplicationStore from "./store"

export default class ApplicationAction {
    @inject(ApplicationStore)
    private store: ApplicationStore

    /**
     * 添加插件
     */
    @Action public addPlugin(plugin: IPlugin) {
        this.store.plugins.push(plugin)
    }

    /**
     * position 根据位置加载插件
     */
    @Action public loadingPluginByPosition(position: string, props?: any) {
        return this.store.plugins
            .filter((plugin) => plugin.position === position)
            .map((plugin, index) => {
                return React.createElement(plugin.class, {
                    key: index,
                    ...props
                })
            })
    }

    /**
     * add component class
     */
    @Action public addComponentClass(componentClass: any) {
        this.store.componentClasses.set(componentClass.defaultProps.gaeaSetting.key, componentClass)
    }

    /**
     * get component class by gaeaKey
     */
    @Action public getComponentClassByKey(gaeaKey: string) {
        return this.store.componentClasses.get(gaeaKey)
    }

    /**
     * set preview
     */
    @Action public setPreview(isPreview: boolean) {
        this.store.isPreview = isPreview
    }

    @Action public setLeftTool(name: string | null) {
        this.store.leftTool = name
    }

    @Action public setRightTool(name: string | null) {
        this.store.rightTool = name
    }

    /**
     * 弹出模态框
     */
    @Action public createModal(config: { title: string }, renderContent: () => React.ReactElement<any>) {
        this.store.modalTitle = config.title
        this.store.modalContentRender = renderContent
        this.store.isShowModal = true
    }

    /**
     * 关闭模态框
     */
    @Action public closeModal() {
        this.store.isShowModal = false
        this.store.modalTitle = null
        this.store.modalContentRender = null
    }

    /**
     * 渲染模态框内容
     */
    @Action public renderModalContent() {
        if (typeof this.store.modalContentRender === "function") {
            return this.store.modalContentRender(this.closeModal)
        } else {
            return null
        }
    }
}
