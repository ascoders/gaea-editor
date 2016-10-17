import * as React from 'react';
import * as typings from './version.type';
import './version.scss';
export default class Version extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    componentWillMount(): void;
    handlePreviewVersion(version: string): void;
    handleSwitchVersion(version: string): void;
    render(): JSX.Element;
}
