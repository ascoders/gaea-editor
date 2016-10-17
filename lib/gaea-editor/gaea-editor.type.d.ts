import * as React from 'react';
import { TransparentlyPropsPropsDefine } from  'nt-transparently-props';
export interface PropsDefine extends TransparentlyPropsPropsDefine {
    title?: string;
    height?: number;
    customComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    baseComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    defaultValue?: string;
    onSave?: (info?: string) => void;
    isHideCustomComponents?: boolean;
    isReactNative?: boolean;
}
export declare class PropsGaea {
    gaeaName: string;
    gaeaIcon: string;
    gaeaUniqueKey: string;
}
export declare class Props extends PropsGaea implements PropsDefine {
    title: string;
    version: string;
    customComponents: React.ComponentClass<FitGaea.ComponentProps>[];
    isHideCustomComponents: boolean;
    height: number;
    onSave: () => void;
    versionInit: (saveVersion: Function) => void;
    onOnlineModalShow: (callback: any) => void;
    onOnlineClick: (key: string | number) => void;
    onLoadMoreVersionClick: () => void;
    onPublish: () => void;
    isReactNative: boolean;
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
