import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager';
import ExternalVariableEditorAction from '../external-variable-editor/action';
import ExternalVariableEditorStore from '../external-variable-editor/store';
export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore;
    ExternalVariableEditorAction?: ExternalVariableEditorAction;
    ExternalVariableEditorStore?: ExternalVariableEditorStore;
    index?: number;
    editInfo?: FitGaea.ComponentPropsGaeaEdit;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
