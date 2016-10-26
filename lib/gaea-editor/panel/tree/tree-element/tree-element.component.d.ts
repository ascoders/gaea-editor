import * as React from 'react';
import * as typings from './tree-element.type';
import './tree-element.scss';
export default class TreeElement extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static ObserveTreeElement: typeof TreeElement;
    private componentInfo;
    private selfInstance;
    private selfDomInstance;
    private sortable;
    componentWillMount(): void;
    componentDidMount(): void;
    getDomInstance(): Element;
    treeNameRender(): JSX.Element;
    handleMouseOver(event: React.MouseEvent): void;
    handleMouseLeave(event: React.MouseEvent): void;
    outerMoveBoxToSelf(): void;
    handleClick(): void;
    setSelect(selected: boolean): void;
    render(): React.ReactElement<any>;
}
