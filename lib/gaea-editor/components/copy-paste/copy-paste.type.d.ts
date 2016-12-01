import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager';
import Store from './store';
import Action from './action';
export interface PropsDefine {
    ApplicationStore?: EditorManager.ApplicationStore;
    ViewportStore?: EditorManager.ViewportStore;
    CopyPasteStore?: Store;
    ViewportAction?: EditorManager.ViewportAction;
    CopyPasteAction?: Action;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
