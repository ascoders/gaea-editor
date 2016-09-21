import * as React from 'react';
import * as typings from './sidebar-tools-preview.type';
import './sidebar-tools-preview.scss';
export default class SidebarTools extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    render(): JSX.Element;
}
