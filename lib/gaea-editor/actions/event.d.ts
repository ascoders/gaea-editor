export declare type EventType = number | string;
export interface Event {
    callback: Function;
    context: any;
}
export default class EventAction {
    private events;
    observableClass: boolean;
    on(eventType: EventType, callback: Function, context?: any): void;
    off(eventType: EventType, callback: Function): boolean;
    emit(eventType: EventType, context?: any): boolean;
}
