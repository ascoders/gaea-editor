import ApplicationStore from '../store/application';
import ViewportStore from '../store/viewport';
import SettingStore from '../store/setting';
export interface PropsDefine {
    viewport?: ViewportStore;
    application?: ApplicationStore;
    setting?: SettingStore;
    value?: string;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
