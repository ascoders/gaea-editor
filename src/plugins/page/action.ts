import { inject } from "dependency-inject"
import { Action } from "dob"
import PageStore from "./store"

export default class PageAction {
  @inject(PageStore)
  private store: PageStore
}
