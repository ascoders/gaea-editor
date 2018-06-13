import { StoreProps } from '../../stores';

export class Props extends StoreProps<void, void> {
  /**
   * Real value field
   */
  public realField?: string;
  /**
   * Editor
   */
  public editor?: IEditor;
}

export class State {}
