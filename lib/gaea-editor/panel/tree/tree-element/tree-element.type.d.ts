import Viewport from '../../../store/viewport';
import Application from '../../../store/application';
export interface PropsDefine {
    viewport?: Viewport;
    application?: Application;
    mapUniqueKey?: string;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    selected?: boolean;
}
export declare class State implements StateDefine {
    selected: boolean;
}
