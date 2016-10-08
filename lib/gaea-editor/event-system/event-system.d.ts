export declare type EventType = number | string;
export interface Event {
    callback: Function;
    context: any;
}
export default class EventSystem {
    private events;
    on(eventType: EventType, callback: Function, context?: any): void;
    off(eventType: EventType, callback: Function): boolean;
    emit(eventType: EventType, context?: any): boolean;
}
