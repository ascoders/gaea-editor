import Setting from '../../../store/setting';
export interface PropsDefine {
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
