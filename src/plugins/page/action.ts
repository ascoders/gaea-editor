import { inject } from "dependency-inject"
import { Action } from "dynamic-object"
import PageStore from "./store"

export default class PageAction {
  @inject(PageStore)
  private store: PageStore
}
