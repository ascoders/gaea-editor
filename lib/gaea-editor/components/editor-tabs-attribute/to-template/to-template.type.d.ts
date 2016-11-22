import * as EditorManager from '../../../../gaea-editor-manager/gaea-editor-manager';
import TabToolsComponentsComboAction from '../../tab-tools-components-combo/action';
export interface PropsDefine {
    ApplicationStore?: EditorManager.ApplicationStore;
    ViewportStore?: EditorManager.ViewportStore;
    ViewportAction?: EditorManager.ViewportAction;
    TabToolsComponentsComboAction?: TabToolsComponentsComboAction;
    ApplicationAction?: EditorManager.ApplicationAction;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    show?: boolean;
    templateName?: string;
}
export declare class State implements StateDefine {
    show: boolean;
    templateName: string;
}
