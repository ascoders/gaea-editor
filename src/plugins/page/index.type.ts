import { StoreProps } from "../../stores"
import PageAction from "./action"
import PageStore from "./store"

export class Props extends StoreProps<{
  PageAction: PageAction
}, {
    PageStore: PageStore
  }> { }
export class State { }
