import * as React from 'react';
import * as typings from './tools.type';
import './tools.scss';
export default class Tools extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    render(): JSX.Element;
}
