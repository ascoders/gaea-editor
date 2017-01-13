import * as React from 'react';
import * as typings from './tab-tools-components.type';
import Action from './action';
import Store from './store';
import './tab-tools-components.scss';
export default class TabToolsComponents extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    static Action: typeof Action;
    static Store: typeof Store;
    componentWillMount(): void;
    getTabItemClasses(activeName: string): string;
    handleChangeType(type: string): void;
    render(): JSX.Element;
}
