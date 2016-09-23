import * as React from 'react';
import Event from './event';
export default class Application {
    event: Event;
    headerHeight: number;
    leftSidebarWidth: number;
    sidebarWidth: number;
    footerHeight: number;
    viewportWidth: number;
    setViewportWidth(width: number): void;
    setSidebarWidth(value: number): void;
    setSidebarMoving(isMoving: boolean): void;
    isSidebarMoving: boolean;
    isPreview: boolean;
    setPreview(isPreview: boolean): void;
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
    baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    setCustomComponents(customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>): void;
    comboComponents: Array<FitGaea.ComboComponentInfo>;
    addComboComponent(comboComponent: FitGaea.ComboComponentInfo): void;
    getComponentByUniqueKey(uniqueKey: string): React.ComponentClass<FitGaea.ComponentProps>;
    isHideCustomComponents: boolean;
}
