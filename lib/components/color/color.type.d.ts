export interface PropsDefine {
    color?: string;
    onChange?: (color?: any) => void;
    onChangeComplete?: (color?: any) => void;
}
export declare class Props implements PropsDefine {
    onChange: () => void;
    onChangeComplete: () => void;
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
