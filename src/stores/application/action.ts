import * as React from 'react'
import ApplicationStore from './store'
import { inject } from 'dependency-inject'
import { Action } from 'dynamic-object'

export default class ApplicationAction {
    @inject(ApplicationStore)
    private store: ApplicationStore

    /**
     * 添加插件
     */
    @Action addPlugin(plugin: Plugin) {
        this.store.plugins.push(plugin)
    }

    /**
     * position 根据位置加载插件
     */
    @Action loadingPluginByPosition(position: string) {
        return this.store.plugins
            .filter(plugin => plugin.position === position)
            .map((plugin, index) => {
                return React.createElement(plugin.class, {
                    key: index
                })
            })
    }

    /**
     * add component class
     */
    @Action addComponentClass(componentClass: any) {
        this.store.componentClasses.set(componentClass.defaultProps.gaeaSetting.key, componentClass)
    }

    /**
     * get component class by key
     */
    @Action getComponentClassByKey(key: string) {
        return this.store.componentClasses.get(key)
    }
}