import * as React from 'react';
import * as typings from './event.type';
import './event.scss';
export default class EditBoxEvent extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
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
