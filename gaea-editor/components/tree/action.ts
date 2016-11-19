import {injectable, action, lazyInject} from '../../../gaea-editor-manager/gaea-editor-manager'

import TreeStore from './store'

@injectable()
export default class TreeAction {
    @lazyInject(TreeStore) private tree: TreeStore

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