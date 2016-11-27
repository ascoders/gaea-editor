export default class EditorEventAction {
    private eventStore;
    private viewport;
    private applicationAction;
    private viewportAction;
    observeClass: boolean;
    addEvent(mapUniqueKey: string, isWeb: boolean): void;
    removeEvent(mapUniqueKey: string, index: number, isWeb: boolean): void;
    updateEventTriggerCondition(mapUniqueKey: string, dataIndex: number, typeIndex: string, isWeb: boolean): void;
    updateEventAction(mapUniqueKey: string, dataIndex: number, eventIndex: string, isWeb: boolean): void;
    updateEventData(mapUniqueKey: string, field: string, value: any): void;
    getEventListName(): string[];
    copyEventToNative(mapUniqueKey: string): void;
    removeNativeEvent(mapUniqueKey: string): void;
    setCurrentEditPropsIndex(index: number, eventProps?: FitGaea.ComponentProps, currentEditIsWeb?: boolean, eventIndex?: number): void;
}
