import * as React from 'react';
export default class ApplicationAction {
    private application;
    observableClass: boolean;
    loadingPluginByPosition(position: string, props?: any): Array<React.ReactElement<any>>;
    setViewportStyle(style: React.CSSProperties): void;
    setViewportContainerStyle(style: React.CSSProperties): void;
    resetViewportStyle(): void;
    getComponentClassByGaeaUniqueKey(gaeaUniqueKey: string): React.ComponentClass<FitGaea.ComponentProps>;
    setPreview(inPreview: boolean): void;
    updatePage(pageValue: string): void;
    cleanComponent(componentInfo: FitGaea.ViewportComponentInfo): any;
    cleanComponentProps(componentProps: FitGaea.ComponentProps): any;
    expendComponent(componentInfo: FitGaea.ViewportComponentInfo): FitGaea.ViewportComponentInfo;
    expendComponentProps(componentProps: FitGaea.ComponentProps): FitGaea.ComponentProps;
}
