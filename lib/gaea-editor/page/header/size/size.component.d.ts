import * as React from 'react';
import * as typings from './size.type';
import './size.scss';
export default class Size extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    changeFitInWeb(type: string): void;
    handleChangeMobileSize(width: number, height: number): void;
    render(): JSX.Element;
}
