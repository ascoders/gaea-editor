export default class CopyPasteAction {
    private copyPaste;
    private viewportAction;
    private viewport;
    observeClass: boolean;
    copy(mapUniqueKey: string): void;
    paste(parentMapUniqueKey: string): boolean;
}
