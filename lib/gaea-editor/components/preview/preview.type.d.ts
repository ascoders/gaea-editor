import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager';
export interface PropsDefine {
    ApplicationStore?: EditorManager.ApplicationStore;
    ApplicationAction?: EditorManager.ApplicationAction;
    ViewportAction?: EditorManager.ViewportAction;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    show?: boolean;
}
export declare class State implements StateDefine {
    show: boolean;
}
