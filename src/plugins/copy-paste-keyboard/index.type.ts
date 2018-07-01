import { StoreProps } from '../../stores';
import { CopyPasteAction } from './action';
import { CopyPasteStore } from './store';

export class Props extends StoreProps<{ CopyPasteAction: CopyPasteAction }, { CopyPasteStore: CopyPasteStore }> {}
export class State {}
