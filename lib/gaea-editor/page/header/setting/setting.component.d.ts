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
    setShowLayout(checked: boolean): void;
    handleBackgroundColorChange(color: any): void;
    handleBackgroundColorChangeComplete(color: any): void;
    render(): JSX.Element;
}
