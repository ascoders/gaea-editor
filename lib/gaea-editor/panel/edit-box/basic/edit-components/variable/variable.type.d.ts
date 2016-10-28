import Viewport from '../../../../../store/viewport';
import Application from '../../../../../store/application';
import Setting from '../../../../../store/setting';
export interface PropsDefine {
    editOption?: FitGaea.ComponentPropsGaeaEdit;
    viewport?: Viewport;
    application?: Application;
    setting?: Setting;
    variable?: FitGaea.VariableData;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    show?: boolean;
}
export declare class State implements StateDefine {
    show: boolean;
}
