import ViewportStore from './store'
import { inject } from 'dependency-inject'
import { Action } from 'dynamic-object'
import * as _ from 'lodash'

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
}