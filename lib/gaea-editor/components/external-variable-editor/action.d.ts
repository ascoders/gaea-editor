export default class ExternalVariableEditorAction {
    private externalVariableEditorStore;
    private ViewportStore;
    private ViewportAction;
    private ApplicationAction;
    observableClass: boolean;
    onInit(): void;
    setCurrentEditComponentVariableByField(field: string, variable: FitGaea.VariableData): void;
    removeCurrentEditComponentVariableByField(field: string): void;
    hideCurrentEditTool(index: number): void;
    showCurrentEditTool(index: number): void;
}
