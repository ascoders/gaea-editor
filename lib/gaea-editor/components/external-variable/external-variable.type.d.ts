import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager';
import ExternalVariableAction from './action';
import ExternalVariableStore from './store';
export interface PropsDefine {
    ExternalVariableAction?: ExternalVariableAction;
    ExternalVariableStore?: ExternalVariableStore;
    ViewportStore?: EditorManager.ViewportStore;
    ApplicationStore?: EditorManager.ApplicationStore;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    show?: boolean;
    name?: string;
    type?: string;
}
export declare class State implements StateDefine {
    show: boolean;
    name: string;
    type: string;
}
