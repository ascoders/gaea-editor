import * as React from 'react';
import * as typings from './viewport-size.type';
import './viewport-size.scss';
export default class ViewportSize extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    componentWillMount(): void;
    changeFitInWeb(type: string): void;
    handleChangeMobileSize(width: number, height: number): void;
    render(): JSX.Element;
}
