export interface IStore {
    [x: string]: any;
}
export default class GlobalSettingStore implements IStore {
    confirmWhenRemoveComponent: boolean;
    showLayout: boolean;
    backgroundColor: string;
    viewportWidth: number;
    viewportHeight: number;
    fitInWeb: string;
    externalParameter: Array<FitGaea.ExternalParameter>;
    showTimeStart: string;
    showTimeEnd: string;
    showTimeStartDate: string;
    showTimeStartTime: string;
    showTimeEndDate: string;
    showTimeEndTime: string;
}
