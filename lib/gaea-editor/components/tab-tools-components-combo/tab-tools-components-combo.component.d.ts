import * as React from 'react';
import * as typings from './tab-tools-components-combo.type';
import Action from './action';
import Store from './store';
import './tab-tools-components-combo.scss';
export default class TabToolsComponentsCombo extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    static Action: typeof Action;
    static Store: typeof Store;
    componentDidMount(): void;
    render(): JSX.Element;
}
