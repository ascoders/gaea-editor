import * as React from 'react';
import { TransparentlyPropsPropsDefine } from  'nt-transparently-props';
export interface PropsDefine extends TransparentlyPropsPropsDefine {
    title?: string;
    height?: number;
    customComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    baseComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    defaultValue?: string;
    defaultSetting?: string;
    onSave?: (info?: string, setting?: string) => void;
    isHideCustomComponents?: boolean;
    isReactNative?: boolean;
    currentVersion?: string;
    onGetPublishList?: (page?: number, callback?: (result: Array<FitGaea.GetPublishListResult>) => void) => void;
    onPreviewVersion?: (version?: string, callback?: (content: string) => void) => void;
    onSwitchVersion?: (version?: string, callback?: (content: string) => void) => void;
    onPublish?: (version?: FitGaea.GetPublishListResult, callback?: () => void) => void;
    explore?: boolean;
}
export declare class Props implements PropsDefine {
    title: string;
    version: string;
    customComponents: React.ComponentClass<FitGaea.ComponentProps>[];
    isHideCustomComponents: boolean;
    height: number;
    onSave: () => void;
    isReactNative: boolean;
    onGetPublishList: () => void;
    onSwitchVersion: () => void;
    onPreviewVersion: () => void;
    onPublish: () => void;
    explore: boolean;
}
export interface StateDefine {
    currentVersion?: string;
    value?: string;
}
export declare class State implements StateDefine {
    currentVersion: string;
}
