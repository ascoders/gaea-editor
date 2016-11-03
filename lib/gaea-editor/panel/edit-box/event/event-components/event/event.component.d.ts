import * as React from 'react';
import * as typings from './event.type';
import './event.scss';
export default class Event extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    handleChange(value: string): void;
    render(): JSX.Element;
}
