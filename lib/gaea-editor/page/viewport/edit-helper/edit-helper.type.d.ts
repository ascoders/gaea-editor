import ApplicationStore from '../../../stores/application';
import ViewportStore from '../../../stores/viewport';
import EventStore from '../../../stores/event';
import ApplicationAction from '../../../actions/application';
import EventAction from '../../../actions/event';
import ViewportAction from '../../../actions/viewport';
export interface PropsDefine {
    mapUniqueKey?: string;
    ApplicationStore?: ApplicationStore;
    ViewportStore?: ViewportStore;
    EventStore?: EventStore;
    ApplicationAction?: ApplicationAction;
    ViewportAction?: ViewportAction;
    EventAction?: EventAction;
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
