import * as React from 'react';
import * as typings from './call.type';
import './call.scss';
export default class Call extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    handleChange(value: string): void;
    render(): JSX.Element;
}
