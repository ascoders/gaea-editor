export default class GlobalSettingAction {
    private globalSetting;
    private applicationAction;
    observableClass: boolean;
    getZipSettingData(): any;
    setDefaultSetting(setting: string): void;
    setShowLayout(isShow: boolean): void;
    setConfirmWhenRemoveComponent(isConfirm: boolean): void;
    setBackgroundColor(color: string, opacity: number): void;
    setViewportSize(width: number, height: number): void;
    changeFitInWeb(type: string): void;
}
