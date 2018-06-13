import { StoreProps } from '../../stores';

export class Props extends StoreProps<void, void> {}
export class State {
  /**
   * 当前 tab 选择
   */
  public activeKey?: string = 'editor';
}
