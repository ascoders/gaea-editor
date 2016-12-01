import * as React from 'react';
import * as typings from './tab-tools-version.type';
import Action from './action';
import Store from './store';
import './tab-tools-version.scss';
export default class TabToolsVersion extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    static Action: typeof Action;
    static Store: typeof Store;
    componentWillMount(): void;
    handlePreviewVersion(version: string): void;
    handleSwitchVersion(version: string): void;
    render(): JSX.Element;
}
