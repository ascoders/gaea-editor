import * as EditorManager from '../../../../gaea-editor-manager/gaea-editor-manager';
import TreeAction from '../action';
export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore;
    EventStore?: EditorManager.EventStore;
    TreeAction?: TreeAction;
    ViewportAction?: EditorManager.ViewportAction;
    EventAction?: EditorManager.EventAction;
    mapUniqueKey?: string;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
