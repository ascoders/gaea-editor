export declare class SettingStore {
    confirmWhenRemoveComponent: boolean;
    showLayout: boolean;
    backgroundColor: string;
    viewportWidth: number;
    viewportHeight: number;
    fitInWeb: string;
    globalParams: Array<FitGaea.GlobalParam>;
}
export default class Setting {
    data: SettingStore;
    getZipSettingData(): any;
    setDefaultSetting(setting: string): void;
    setShowLayout(isShow: boolean): void;
    setConfirmWhenRemoveComponent(isConfirm: boolean): void;
    setBackgroundColor(color: string, opacity: number): void;
    setViewportSize(width: number, height: number): void;
    changeFitInWeb(type: string): void;
    addGlobalParam(globalParam: FitGaea.GlobalParam): void;
    removeGlobalParam(index: number): void;
}
