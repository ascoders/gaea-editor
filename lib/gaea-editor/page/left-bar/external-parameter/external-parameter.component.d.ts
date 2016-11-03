import * as React from 'react';
import * as typings from './external-parameter.type';
import './external-parameter.scss';
export default class externalParameter extends React.Component<typings.PropsDefine, typings.StateDefine> {
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
