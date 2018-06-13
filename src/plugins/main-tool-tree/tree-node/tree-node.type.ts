import { StoreProps } from '../../../stores';
import TreeAction from '../action';
import TreeStore from '../store';

export class Props extends StoreProps<
  {
    TreeAction: TreeAction;
  },
  {
    TreeStore: TreeStore;
  }
> {
  public instanceKey: string;
}
export class State {}
