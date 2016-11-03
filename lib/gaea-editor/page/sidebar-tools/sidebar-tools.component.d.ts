import * as React from 'react';
import * as typings from './sidebar-tools.type';
import './sidebar-tools.scss';
export default class SidebarTools extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    render(): JSX.Element;
}
