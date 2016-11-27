import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager';
import TreeAction from './action';
export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore;
    ApplicationStore?: EditorManager.ApplicationStore;
    ViewportAction?: EditorManager.ViewportAction;
    TreeAction?: TreeAction;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
