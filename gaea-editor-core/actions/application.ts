import { injectable } from 'inversify'
import * as React from 'react'
import { action, extendObservable } from 'mobx'
import ApplicationStore from '../stores/application'
import { lazyInject } from '../utils/kernel'

@injectable()
export default class ApplicationAction {
    @lazyInject(ApplicationStore) private application: ApplicationStore

    @action('根据位置加载插件') loadingPluginByPosition(position: string): Array<React.ReactElement<any>> {
        return this.application.plugins.map((plugin, index) => {
            if (plugin.position === position) {
                const props = {
                    key: index
                }

                return React.createElement(plugin, props)
            }
        })
    }

    @action('设置视图区块样式') viewportStyleSet(style: React.CSSProperties) {
        this.application.viewportStyle = extendObservable(this.application.viewportStyle, style)
    }

    @action('重置视图区块样式') viewportStyleReset() {
        this.application.viewportStyle = {}
    }
}