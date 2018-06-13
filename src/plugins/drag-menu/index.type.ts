import { StoreProps } from '../../stores';

export class Props extends StoreProps<void, void> {}

export class State {
  /**
   * 当前搜索内容
   */
  public searchContent = '';
}
