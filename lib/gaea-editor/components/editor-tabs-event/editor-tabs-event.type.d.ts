import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager';
import Store from './store';
import Action from './action';
export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore;
    ApplicationStore?: EditorManager.ApplicationStore;
    EditorEventStore?: Store;
    EditorEventAction?: Action;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    isExpend?: boolean;
    editType?: string;
}
export declare class State implements StateDefine {
    editType: string;
}
