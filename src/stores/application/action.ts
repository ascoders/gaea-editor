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

    @Action public setIsShowLeftTool(isShow: boolean) {
        this.store.isShowLeftTool = isShow
    }

    @Action public setIsFullLeftTool(isFull: boolean) {
        this.store.isFullLeftTool = isFull
    }
}
