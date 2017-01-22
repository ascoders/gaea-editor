import * as React from 'react';
import * as typings from './tab-tools.type';
import './tab-tools.scss';
export default class TabTools extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    render(): JSX.Element;
}
