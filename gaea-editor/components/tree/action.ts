import { action, inject, observable } from '../../../gaea-editor-manager/gaea-editor-manager'

import TreeStore from './store'

export default class TreeAction {
    @inject('TreeStore') private tree: TreeStore

    @observable observeClass = true

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