import * as React from 'react';
import * as typings from './set-group-button.type';
import './set-group-button.scss';
export default class SetGroupButton extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    handleShowModal(): void;
    handleOk(): void;
    handleCancel(): void;
    handleChangeName(event: any): void;
    render(): JSX.Element;
}
