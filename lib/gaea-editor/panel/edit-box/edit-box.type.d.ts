import Application from '../../store/application';
import Viewport from '../../store/viewport';
export interface PropsDefine {
    viewport?: Viewport;
    application?: Application;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    animateStatus?: string;
}
export declare class State implements StateDefine {
    animateStatus: string;
}
