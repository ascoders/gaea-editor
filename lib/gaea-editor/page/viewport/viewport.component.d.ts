import * as React from 'react';
import * as typings from './viewport.type';
import './viewport.scss';
export default class Viewport extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    componentWillMount(): void;
    componentDidMount(): void;
    getRootRef(ref: React.ReactInstance): void;
    handleMouseLeave(event: React.MouseEvent): void;
    render(): JSX.Element;
}
