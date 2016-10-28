import Setting from '../../../store/setting';
import Viewport from '../../../store/viewport';
import Application from '../../../store/application';
export interface PropsDefine {
    setting?: Setting;
    viewport?: Viewport;
    application?: Application;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    show?: boolean;
    name?: string;
    type?: string;
}
export declare class State implements StateDefine {
    show: boolean;
    name: string;
    type: string;
}
