import * as React from 'react';
import { TransparentlyPropsPropsDefine } from  'nt-transparently-props';
export interface PropsDefine extends TransparentlyPropsPropsDefine {
    title?: string;
    height?: number;
    customComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    baseComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    defaultValue?: {
        [mapUniqueKey: string]: FitGaea.ViewportComponentInfo;
    };
    onSave?: (info?: {
        [mapUniqueKey: string]: FitGaea.ViewportComponentInfo;
    }) => void;
    isHideCustomComponents?: boolean;
    versionInit?: (saveVersion?: (versions?: Array<FitGaea.SaveInfo>) => void, hasNext?: boolean) => void;
    onLoadMoreVersionClick?: (saveVersion?: (versions?: Array<FitGaea.SaveInfo>) => void, hasNext?: boolean) => void;
    onPublish?: (id?: string, version?: string, remarks?: string, save?: Function) => void;
    onOnlineModalShow?: (callback: (lists: Array<FitGaea.OnlineVersion>) => void) => void;
    onOnlineClick?: (key: string | number) => void;
    getSourceFileList?: (folderId: string, callback: (lists: Array<FitGaea.SourceFile>) => void) => void;
    addSourceFile?: (folderId?: string, fileInfo?: FitGaea.SourceFile, addSuccess?: () => void) => void;
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
    getSourceFileList: (folderId: string, callback: (lists: FitGaea.SourceFile[]) => void) => void;
    addSourceFile: (folderId?: string, fileInfo?: FitGaea.SourceFile, addSuccess?: () => void) => void;
    isReactNative: boolean;
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
