import Viewport from '../../../../store/viewport';
import Application from '../../../../store/application';
export interface PropsDefine {
    viewport?: Viewport;
    application?: Application;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    show?: boolean;
    name?: string;
}
export declare class State implements StateDefine {
    show: boolean;
}
