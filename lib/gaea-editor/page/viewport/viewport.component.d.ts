import * as React from 'react';
import * as typings from './viewport.type';
import './viewport.scss';
import EditHelper from './edit-helper/edit-helper.component';
export default class Viewport extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private handleAnyDomChange;
    componentDidMount(): void;
    componentWillUnmount(): void;
    addListener(): void;
    handleViewportOrTreeComponentMouseOver(listnerContext: any, opts: FitGaea.MouseHoverComponentEvent): void;
    findEditHelperByMapUniqueKey(mapUniqueKey: string): EditHelper;
    handleViewportOrTreeRootComponentMouseLeave(): void;
    handleChangeComponentSelectStatus(listnerContext: any, opts: FitGaea.ComponentSelectStatusEvent): void;
    getRootRef(ref: React.ReactInstance): void;
    handleMouseLeave(event: React.MouseEvent): void;
    render(): JSX.Element;
}
