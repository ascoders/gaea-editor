import * as EditorManager from '../../../gaea-editor-manager/gaea-editor-manager';
import TabToolsVersionStore from './store';
import TabToolsVersionAction from './action';
export interface PropsDefine {
    TabToolsVersionStore?: TabToolsVersionStore;
    ApplicationStore?: EditorManager.ApplicationStore;
    ApplicationAction?: EditorManager.ApplicationAction;
    TabToolsVersionAction?: TabToolsVersionAction;
    EventStore?: EditorManager.EventStore;
    EventAction?: EditorManager.EventAction;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
