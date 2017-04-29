import { inject } from "dependency-inject"
import { Action } from "dynamic-object"
import * as _ from "lodash"
import ViewportStore from "./store"

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
    @Action public setViewportDOM(dom: HTMLElement) {
        this.store.viewportDOM = dom
    }

    /**
     * 生成唯一的 instance key
     */
    @Action public createNewInstanceKey() {
        return _.uniqueId("gaea_instance_")
    }

    /**
     * 设置根节点的 instance key
     */
    @Action public setRootInstanceKey(key: string) {
        this.store.rootInstanceKey = key
    }

    /**
     * Add new component to viewport
     */
    @Action public addComponent(gaeaKey: string, param: InstanceInfo) {
        const newInstanceKey = this.createNewInstanceKey()
        this.store.components.set(newInstanceKey, param)
        return newInstanceKey
    }
}
