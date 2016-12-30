import * as React from 'react';
import * as typings from './to-template.type';
import './to-template.scss';
export default class ToTemplate extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handleShowModal(): void;
    handleOk(): void;
    handleCancel(): void;
    handleChangeTemplateName(value: string): void;
    render(): JSX.Element;
}
