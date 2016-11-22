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
    showEditComponents: boolean;
    isLayoutComponentActive: boolean;
    currentDragComponentInfo: FitGaea.CurrentDragComponentInfo;
    readonly currentEditComponentPath: string[];
}
