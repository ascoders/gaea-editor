import * as React from 'react';
import * as typings from './delete.type';
import './delete.scss';
export default class Delete extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    componentWillMount(): void;
    componentWillUnmount(): void;
    removeComponent(): void;
    render(): any;
}
