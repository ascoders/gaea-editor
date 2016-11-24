export default class TreeAction {
    private tree;
    observeClass: boolean;
    setTreeRootDom(dom: HTMLElement): void;
    addTreeDom(mapUniqueKey: string, dom: HTMLElement): void;
    removeTreeDom(mapUniqueKey: string): void;
}
