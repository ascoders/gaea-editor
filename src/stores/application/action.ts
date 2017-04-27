import * as React from 'react'
import ApplicationStore from './store'
import { inject } from 'dependency-inject'

export default class ApplicationAction {
    @inject(ApplicationStore)
    private store: ApplicationStore

    /**
     * 添加插件
     */
    addPlugin(plugin: Plugin) {
        this.store.plugins.push(plugin)
    }

    /**
     * position 根据位置加载插件
     */
    loadingPluginByPosition(position: string) {
        return this.store.plugins
            .filter(plugin => plugin.position === position)
            .map((plugin, index) => {
                return React.createElement(plugin.class, {
                    key: index
                })
            })
    }

    /**
   //      * 根据位置加载插件
   //      */
    //     loadingPluginByPosition = (position: string) => (dispatch: Dispatch<any>, getState: () => State) => {
    //         const state = getState()
    //         return state.application.plugins.map((plugin, index) => {
    //             if (plugin.position === position) {
    //                 return React.createElement(plugin, {
    //                     key: index
    //                 })
    //             }
    //         })
    //     }
}