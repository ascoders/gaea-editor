import Viewport from '../../../../../store/viewport';
import Application from '../../../../../store/application';
export interface PropsDefine {
    editOption?: FitGaea.ComponentPropsGaeaEdit;
    viewport?: Viewport;
    application?: Application;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    expand?: boolean;
}
export declare class State implements StateDefine {
}
