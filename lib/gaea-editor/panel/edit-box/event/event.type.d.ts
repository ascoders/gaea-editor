import Application from '../../../store/application';
import Viewport from '../../../store/viewport';
export interface PropsDefine {
    viewport?: Viewport;
    application?: Application;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    isExpend?: boolean;
    editType?: string;
}
export declare class State implements StateDefine {
    editType: string;
}
