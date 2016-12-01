import * as React from 'react';
import * as typings from './viewport-guideline.type';
import './viewport-guideline.scss';
export default class TabTools extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleViewportUpdated(): void;
    render(): JSX.Element;
}
