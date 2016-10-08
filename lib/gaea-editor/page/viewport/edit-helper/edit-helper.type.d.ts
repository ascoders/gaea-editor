import Application from '../../../store/application';
import Viewport from '../../../store/viewport';
import Setting from '../../../store/setting';
export interface PropsDefine {
    mapUniqueKey?: string;
    application?: Application;
    viewport?: Viewport;
    setting?: Setting;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    selected?: boolean;
}
export declare class State implements StateDefine {
    selected: boolean;
}
