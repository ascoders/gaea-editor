import { inject } from "dependency-inject"
import { Action } from "dynamic-object"
import { hasClass, removeClass } from "../../utils/dom"
import TreeStore from "./store"

export default class TreeAction {
  @inject(TreeStore)
  private store: TreeStore

  // onInit() {
  //   observe(this.ViewportStore, "currentEditComponentMapUniqueKey", (newValue: string, oldValue: string) => {
  //     const selectClass = "tree-selected"

  //     // 把上一个元素选中样式置空
  //     if (oldValue !== null) {
  //       const prevEditDom = this.tree.treeDoms.get(oldValue)
  //       if (hasClass(prevEditDom, selectClass)) {
  //         removeClass(prevEditDom, selectClass)
  //       }
  //     }

  //     // 设置新元素为选中样式
  //     if (newValue !== null) {
  //       const nextEditDom = this.tree.treeDoms.get(newValue)
  //       nextEditDom.className += ` ${selectClass}`
  //     }
  //   })
  // }

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
