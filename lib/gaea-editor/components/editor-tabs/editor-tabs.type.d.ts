import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager';
import EventStore from '../editor-tabs-event/store';
export interface PropsDefine {
    ViewportStore?: EditorManager.ViewportStore;
    EditorEventStore?: EventStore;
    ApplicationAction?: EditorManager.ApplicationAction;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
