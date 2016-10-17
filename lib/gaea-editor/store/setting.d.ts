export declare class SettingStore {
    confirmWhenRemoveComponent: boolean;
    showLayout: boolean;
    backgroundColor: string;
    viewportWidth: number;
}
export default class Setting {
    data: SettingStore;
    getZipSettingData(): any;
    setDefaultSetting(setting: string): void;
    setShowLayout(isShow: boolean): void;
    setConfirmWhenRemoveComponent(isConfirm: boolean): void;
    setBackgroundColor(color: string, opacity: number): void;
    setViewportWidth(width: number): void;
}
