import * as React from 'react';
import * as typings from './external-variable-editor.type';
import Action from './action';
import Store from './store';
import './external-variable-editor.scss';
export default class ExternalVariableEditor extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    static Action: typeof Action;
    static Store: typeof Store;
    render(): JSX.Element;
}
