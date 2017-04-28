import ViewportStore from './store'
import { inject } from 'dependency-inject'
import { Action } from 'dynamic-object'
import * as _ from 'lodash'

/**
 * gaeaKey 指组件 class 防止重复的 props.gaeaSetting.key
 * instanceKey 是 viewport 给每个组件实例的唯一标识
 */

export default class ViewportAction {
    @inject(ViewportStore)
    private store: ViewportStore

    /**
     * 设置视图区域 dom 对象
     */
    @Action setViewportDOM(dom: HTMLElement) {
        this.store.viewportDOM = dom
    }

    /**
     * 生成唯一的 instance key
     */
    @Action createNewInstanceKey() {
        return _.uniqueId('gaea_instance_')
    }

    /**
     * 设置根节点的 instance key
     */
    @Action setRootInstanceKey(key: string) {
        this.store.rootInstanceKey = key
    }

    /**
     * Add new component to viewport
     */
    @Action addComponent(gaeaKey: string, param: InstanceInfo) {
        const newInstanceKey = this.createNewInstanceKey()
        this.store.components.set(newInstanceKey, param)
        return newInstanceKey
    }
}