import * as React from 'react';
import Event from './event';
export default class Application {
    event: Event;
    headerHeight: number;
    leftSidebarWidth: number;
    sidebarWidth: number;
    sidebarAddonWidth: number;
    footerHeight: number;
    viewportWidth: number;
    isSidebarMoving: boolean;
    isPreview: boolean;
    comboComponents: Array<FitGaea.ComboComponentInfo>;
    baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    isHideCustomComponents: boolean;
    title: string;
    defaultValue: {
        [mapUniqueKey: string]: FitGaea.ViewportComponentInfo;
    };
    height: number;
    isReactNative: boolean;
    setInitPropsToApplication(props: {
        title: string;
        baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>;
        customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>;
        isHideCustomComponents: boolean;
        height: number;
        defaultValue: {
            [mapUniqueKey: string]: FitGaea.ViewportComponentInfo;
        };
        isReactNative: boolean;
    }): void;
    setCustomComponents(customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>): void;
    addComboComponent(comboComponent: FitGaea.ComboComponentInfo): void;
    getComponentByUniqueKey(uniqueKey: string): React.ComponentClass<FitGaea.ComponentProps>;
    setViewportWidth(width: number): void;
    setSidebarWidth(value: number): void;
    setSidebarMoving(isMoving: boolean): void;
    setPreview(isPreview: boolean): void;
    cleanComponent(componentInfo: FitGaea.ViewportComponentInfo): any;
    expendComponent(componentInfo: FitGaea.ViewportComponentInfo): FitGaea.ViewportComponentInfo;
}
