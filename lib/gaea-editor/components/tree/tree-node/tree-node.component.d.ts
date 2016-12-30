import * as React from 'react';
import * as typings from './tree-node.type';
import './tree-node.scss';
export default class TreeNodeComponent extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static ObserveTreeElement: typeof TreeNodeComponent;
    private componentInfo;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateDom(): void;
    handleRenderTitle(): JSX.Element;
    handleMouseOver(event: MouseEvent): void;
    handleClick(event: MouseEvent): void;
    render(): React.ReactElement<any>;
}
