import * as React from 'react';
import * as typings from './setting.type';
import './setting.scss';
export default class Setting extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    handleShowModal(): void;
    handleOk(): void;
    handleCancel(): void;
    setConfirmWhenRemoveComponent(checked: boolean): void;
    setShowLayoutWhenDragging(checked: boolean): void;
    render(): JSX.Element;
}
