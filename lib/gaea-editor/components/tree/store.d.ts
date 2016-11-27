export default class TreeStore {
    private viewport;
    treeRootDom: HTMLElement;
    treeDoms: Map<string, HTMLElement>;
    readonly currentHoverTreeDom: HTMLElement;
}
