import Viewport from '../../../../store/viewport';
import Setting from '../../../../store/setting';
export interface PropsDefine {
    viewport?: Viewport;
    setting?: Setting;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    show?: boolean;
}
export declare class State implements StateDefine {
    show: boolean;
}
