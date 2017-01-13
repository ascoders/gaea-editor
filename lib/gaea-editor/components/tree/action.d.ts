export default class TreeAction {
    private tree;
    private ViewportStore;
    observeClass: boolean;
    onInit(): void;
    setTreeRootDom(dom: HTMLElement): void;
    addTreeDom(mapUniqueKey: string, dom: HTMLElement): void;
    removeTreeDom(mapUniqueKey: string): void;
}
