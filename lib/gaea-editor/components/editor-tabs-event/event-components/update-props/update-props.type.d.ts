import * as EditorManager from '../../../../../gaea-editor-manager/gaea-editor-manager';
import Store from '../../store';
import Action from '../../action';
export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore;
    ViewportAction?: EditorManager.ViewportAction;
    ApplicationAction?: EditorManager.ApplicationAction;
    EditorEventAction?: Action;
    EditorEventStore?: Store;
    index?: number;
    isWeb?: boolean;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
