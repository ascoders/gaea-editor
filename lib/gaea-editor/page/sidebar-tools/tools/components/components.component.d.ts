import * as React from 'react';
import * as typings from './components.type';
import './components.scss';
export default class Components extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private dragContainerInstance;
    private dragContainerDomInstance;
    private lastDragStartIndex;
    componentDidMount(): void;
    getUniqueKeyByIndex(index: number): string;
    setDragContainerInstance(ref: React.ReactInstance): void;
    handleChangeSelectedType(type: string): void;
    renderSwitchButtonGroup(): JSX.Element[];
    handleExport(component: FitGaea.ComboComponentInfo): void;
    handleCancelExportModal(): void;
    renderDragComponents(): JSX.Element[];
    render(): JSX.Element;
}
