import { inject } from "dependency-inject"
import ViewportStore from "../../stores/viewport/store"

export default class TreeStore {
  @inject(ViewportStore)
  public viewportStore: ViewportStore

  // 树根节点实例
  public treeRootDom: HTMLElement = null

  // 所有树节点实例
  public treeDoms = new Map<string, HTMLElement>()

  // 当前 hover 的树 dom 节点
  public get currentHoverTreeDom() {
    return this.treeDoms.get(this.viewportStore.currentHoverInstanceKey)
  }
}
