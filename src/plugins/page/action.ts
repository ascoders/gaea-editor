import { Action, inject } from "dob"
import PageStore from "./store"

export default class PageAction {
  @inject(PageStore)
  private store: PageStore
}
