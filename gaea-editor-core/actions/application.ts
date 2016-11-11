import {injectable} from 'inversify'
import * as React from 'react'
import {action, extendObservable} from 'mobx'
import ApplicationStore from '../stores/application'
import {lazyInject} from '../utils/kernel'

@injectable()
export default class ApplicationAction {
    @lazyInject(ApplicationStore) private application: ApplicationStore

    @action('根据位置加载插件') loadingPluginByPosition(position: string, props: any = {}): Array<React.ReactElement<any>> {
        return this.application.plugins.map((plugin, index) => {
            if (plugin.position === position) {
                props.key = index
                return React.createElement(plugin, props)
            }
        })
    }

    @action('设置视图区块样式') setViewportStyle(style: React.CSSProperties) {
        this.application.viewportStyle = extendObservable(this.application.viewportStyle, style)
    }

    @action('重置视图区块样式') resetViewportStyle() {
        this.application.viewportStyle = {}
    }

    @action('根据 gaeaUniqueKey 获取组件类') getComponentClassByGaeaUniqueKey(gaeaUniqueKey: string) {
        // 从通用、定制组件中查找
        const allComponents = this.application.editorProps.commonComponents.concat(this.application.editorProps.customComponents)
        return allComponents.find(component=>component.defaultProps.gaeaUniqueKey === gaeaUniqueKey)
    }
}