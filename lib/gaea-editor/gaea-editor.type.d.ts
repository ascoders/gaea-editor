import * as React from 'react';
export interface PropsDefine {
    plugins?: Array<FitGaea.Plugin>;
    commonComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    customComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    rootLayoutComponentUniqueKey?: string;
    defaultValue?: string;
    defaultSetting?: string;
    isReactNative?: boolean;
    onSave?: (info?: string, setting?: string) => void;
    onPublish?: (version: string) => void;
    currentVersion?: string;
    onGetPublishList?: (page?: number, callback?: (result: Array<FitGaea.GetPublishListResult>) => void) => void;
    onPreviewVersion?: (version?: string, callback?: (content: string) => void) => void;
    onSwitchVersion?: (version?: string, callback?: (content: string) => void) => void;
    customOptions?: {
        [className: string]: FitGaea.ComponentProps;
    };
    [x: string]: any;
}
export declare class Props implements PropsDefine {
    plugins: FitGaea.Plugin[];
    commonComponents: React.ComponentClass<FitGaea.ComponentProps>[];
    customComponents: React.ComponentClass<FitGaea.ComponentProps>[];
    rootLayoutComponentUniqueKey: string;
    defaultValue: string;
    defaultSetting: string;
    isReactNative: boolean;
    onSave: () => void;
    onPublish: () => void;
    onGetPublishList: () => void;
    onSwitchVersion: () => void;
    onPreviewVersion: () => void;
    currentVersion: string;
    customOptions: any;
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
