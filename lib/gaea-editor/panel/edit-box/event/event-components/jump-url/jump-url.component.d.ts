import * as React from 'react';
import * as typings from './jump-url.type';
import './jump-url.scss';
export default class JumpUrl extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    handleChange(value: string): void;
    render(): JSX.Element;
}
