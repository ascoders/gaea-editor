import * as React from 'react';
import * as typings from './template.type';
import './template.scss';
export default class Template extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    componentDidMount(): void;
    render(): JSX.Element;
}
