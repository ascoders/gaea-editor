import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager';
export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore;
    ApplicationStore?: EditorManager.ApplicationStore;
    ViewportAction?: EditorManager.ViewportAction;
    index?: number;
    editInfo?: FitGaea.ComponentPropsGaeaEdit;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
