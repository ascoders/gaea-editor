import * as React from 'react';
import * as typings from './global-param.type';
import './global-param.scss';
export default class GlobalParam extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    handleShowModal(): void;
    handleOk(): void;
    handleCancel(): void;
    handleChangeName(name: string): void;
    handleChangeType(type: string): void;
    handleDelete(index: number): void;
    render(): JSX.Element;
}
