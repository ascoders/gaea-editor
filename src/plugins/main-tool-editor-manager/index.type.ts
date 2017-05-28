import { StoreProps } from "../../stores"

export class Props extends StoreProps<void, void> {
  /**
   * injected 完整的控制字段路径
   */
  public realField?: string = ""
  public editors?: IEditor[]
}
export class State { }
