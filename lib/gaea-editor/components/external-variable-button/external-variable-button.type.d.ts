import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager';
export interface PropsDefine {
    ApplicationAction?: EditorManager.ApplicationAction;
    ApplicationStore?: EditorManager.ApplicationStore;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    show?: boolean;
}
export declare class State implements StateDefine {
    show: boolean;
}
