export default class GlobalSettingAction {
    private globalSetting;
    private applicationAction;
    observableClass: boolean;
    changeCustomSetting(key: string, value: string): void;
    getZipSettingData(): any;
    setDefaultSetting(setting: string): void;
    setShowLayout(isShow: boolean): void;
    setConfirmWhenRemoveComponent(isConfirm: boolean): void;
    setBackgroundColor(color: string, opacity: number): void;
    setViewportSize(width: number, height: number): void;
    changeFitInWeb(type: string): void;
    changeShowTimeUnlimited(): void;
    changeShowTimeLimited(startDate?: Date, endDate?: Date): void;
    changeShowTime(startOrEnd: string, dateOrTime: string, value: string): void;
}
