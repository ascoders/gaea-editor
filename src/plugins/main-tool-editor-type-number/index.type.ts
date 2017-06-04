import { StoreProps } from "../../stores"

export class Props extends StoreProps<void, void> {
  /**
   * injected
   */
  public realField?: string
  public editor?: IEditor
}

export class State { }
