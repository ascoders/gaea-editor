import * as React from 'react';
import * as typings from './editor-tabs-event.type';
import Action from './action';
import Store from './store';
import './editor-tabs-event.scss';
export default class EditorTabsEvent extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    static Action: typeof Action;
    static Store: typeof Store;
    componentWillMount(): void;
    handleAddEvent(): void;
    handleRemoveEvent(index: number): void;
    handleChangeEventTriggerCondition(dataIndex: number, typeIndex: string): void;
    handleChangeEventAction(dataIndex: number, eventIndex: string): void;
    handleExpand(): void;
    handleCompress(): void;
    changeEditType(type: string): void;
    canExpend(): boolean;
    canCompress(): boolean;
    renderEventEditor(eventData: Array<FitGaea.EventData>): JSX.Element[];
    render(): JSX.Element;
}
