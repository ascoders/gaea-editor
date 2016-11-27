import * as EditorManager from '../../../../../gaea-editor-manager/gaea-editor-manager';
import Action from '../../action';
export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore;
    EditorEventAction?: Action;
    index?: number;
    isWeb?: boolean;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
