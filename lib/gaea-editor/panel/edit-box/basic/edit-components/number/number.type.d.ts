import Viewport from '../../../../../store/viewport';
export interface PropsDefine {
    editOption?: FitGaea.ComponentPropsGaeaEdit;
    viewport?: Viewport;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
    unit?: string;
}
export declare class State implements StateDefine {
    unit: string;
}
