import * as React from 'react';
import * as typings from './tree.type';
import TreeElement from './tree-element/tree-element.component';
import './tree.scss';
export default class Tree extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private childInstance;
    private childDomInstance;
    componentDidMount(): void;
    componentWillUnmount(): void;
    addListener(): void;
    handleViewportOrTreeComponentMouseOver(listnerContext: any, opts: FitGaea.MouseHoverComponentEvent): void;
    scrollToChildren(child: TreeElement): void;
    findEditHelperByMapUniqueKey(mapUniqueKey: string): TreeElement;
    handleViewportOrTreeRootComponentMouseLeave(): void;
    handleChangeComponentSelectStatus(listnerContext: any, opts: FitGaea.ComponentSelectStatusEvent): void;
    setChildRef(ref: React.ReactInstance): void;
    render(): JSX.Element;
}
