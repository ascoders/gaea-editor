import * as React from 'react';
import * as typings from './left-bar.type';
import './left-bar.scss';
export default class LeftBar extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    render(): JSX.Element;
}
