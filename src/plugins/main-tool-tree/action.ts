import { inject } from "dependency-inject"
import { Action } from "dob"
import { hasClass, removeClass } from "../../utils/dom"
import TreeStore from "./store"

export default class TreeAction {
  @inject(TreeStore)
  private store: TreeStore

  /**
   * 设置树根节点
   */
  @Action public setTreeRootDom(dom: HTMLElement) {
    this.store.treeRootDom = dom
  }

  /**
   * 新增树 dom
   */
  @Action public addTreeDom(instanceKey: string, dom: HTMLElement) {
    this.store.treeDoms.set(instanceKey, dom)
  }
  /**
   * 移除树 dom
   */
  @Action public removeTreeDom(instanceKey: string) {
    this.store.treeDoms.delete(instanceKey)
  }
}
