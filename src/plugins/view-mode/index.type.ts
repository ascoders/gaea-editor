import { StoreProps } from '../../stores';

export class Props extends StoreProps<void, void> {
  public defaultViewMode?: ViewMode;
}

export class State {
  public showModel = false;

  public currentIndex = 0;
}
