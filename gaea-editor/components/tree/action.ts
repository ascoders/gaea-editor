import { action, inject, observable, observe, ViewportStore } from '../../../gaea-editor-manager/gaea-editor-manager'
import { hasClass, removeClass } from '../../utils/dom'

import TreeStore from './store'

export default class TreeAction {
    @inject('TreeStore') private tree: TreeStore
    @inject('ViewportStore') private ViewportStore: ViewportStore

    @observable observeClass = true

    onInit() {
        observe(this.ViewportStore, 'currentEditComponentMapUniqueKey', (newValue: string, oldValue: string) => {
            const selectClass = 'tree-selected'

            // 把上一个元素选中样式置空
            if (oldValue !== null) {
                const prevEditDom = this.tree.treeDoms.get(oldValue)
                if (hasClass(prevEditDom, selectClass)) {
                    removeClass(prevEditDom, selectClass)
                }
            }

            // 设置新元素为选中样式
            if (newValue !== null) {
                const nextEditDom = this.tree.treeDoms.get(newValue)
                nextEditDom.className += ` ${selectClass}`
            }
        })
    }

    @action('设置树根节点') setTreeRootDom(dom: HTMLElement) {
        this.tree.treeRootDom = dom
    }

    @action('新增树 dom') addTreeDom(mapUniqueKey: string, dom: HTMLElement) {
        this.tree.treeDoms.set(mapUniqueKey, dom)
    }

    @action('移除树 dom') removeTreeDom(mapUniqueKey: string) {
        this.tree.treeDoms.delete(mapUniqueKey)
    }
}