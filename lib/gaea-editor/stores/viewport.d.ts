import { ObservableMap } from 'mobx';
export default class ViewportStore {
    components: ObservableMap<FitGaea.ViewportComponentInfo>;
    componentDomInstances: Map<string, HTMLElement>;
    rootMapUniqueKey: string;
    viewportDom: HTMLElement;
    currentHoverComponentMapUniqueKey: string;
    readonly currentHoverComponentDom: HTMLElement;
    currentEditComponentMapUniqueKey: string;
    readonly currentEditComponentInfo: FitGaea.ViewportComponentInfo;
    currentDragComponentInfo: FitGaea.CurrentDragComponentInfo;
    showEditComponents: boolean;
    isLayoutComponentActive: boolean;
    readonly currentEditComponentPath: string[];
}
