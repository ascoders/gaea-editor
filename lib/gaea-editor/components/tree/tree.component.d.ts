import * as React from 'react';
import * as typings from './tree.type';
import TreeAction from './action';
import TreeStore from './store';
import './tree.scss';
export default class TreePlugin extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    static Action: typeof TreeAction;
    static Store: typeof TreeStore;
    componentDidMount(): void;
    handleMouseLeave(): void;
    render(): JSX.Element;
}
