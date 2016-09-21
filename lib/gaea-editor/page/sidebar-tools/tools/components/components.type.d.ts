import Application from '../../../../store/application';
import Viewport from '../../../../store/viewport';
export interface PropsDefine {
    application?: Application;
    viewport?: Viewport;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    selectedType?: string;
}
export declare class State implements StateDefine {
    selectedType: string;
}
