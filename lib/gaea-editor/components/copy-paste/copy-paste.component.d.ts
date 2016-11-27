import * as React from 'react';
import * as typings from './copy-paste.type';
import Action from './action';
import Store from './store';
import './copy-paste.scss';
export default class CopyPaste extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    static Action: typeof Action;
    static Store: typeof Store;
    componentWillMount(): void;
    componentWillUnmount(): void;
    copy(): void;
    paste(): void;
    render(): any;
}
