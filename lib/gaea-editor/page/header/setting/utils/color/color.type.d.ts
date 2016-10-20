import * as React from 'react';
import Viewport from '../../../../../store/viewport';
import Application from '../../../../../store/application';
export interface PropsDefine {
    color?: string;
    onChange?: (color?: any) => void;
    onChangeComplete?: (color?: any) => void;
    absoluteStyle?: React.CSSProperties;
    viewport?: Viewport;
    application?: Application;
}
export declare class Props implements PropsDefine {
    onChange: () => void;
    onChangeComplete: () => void;
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
