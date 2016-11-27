import * as React from 'react';
import * as typings from './external-variable.type';
import Action from './action';
import Store from './store';
import './external-variable.scss';
export default class ExternalVariable extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    static Action: typeof Action;
    static Store: typeof Store;
    handleShowModal(): void;
    handleOk(): void;
    handleCancel(): void;
    handleChangeName(name: string): void;
    handleChangeType(type: string): void;
    handleDelete(index: number): void;
    render(): JSX.Element;
}
