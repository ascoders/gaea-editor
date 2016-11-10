import {injectable, computed, lazyInject, ViewportStore} from '../../../gaea-editor-manager/gaea-editor-manager'

@injectable()
export default class TreeStore {
    @lazyInject(ViewportStore) private viewport: ViewportStore

    // 树根节点实例
    treeRootDom: HTMLElement = null

    // 所有树节点实例
    treeDoms = new Map<string,HTMLElement>()

    // 当前 hover 的树 dom 节点
    @computed get currentHoverTreeDom() {
        return this.treeDoms.get(this.viewport.currentHoverComponentMapUniqueKey)
    }
}