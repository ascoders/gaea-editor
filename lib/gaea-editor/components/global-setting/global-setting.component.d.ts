import * as React from 'react';
import * as typings from './global-setting.type';
import Action from './action';
import Store from './store';
import './global-setting.scss';
export default class GlobalSetting extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    static Action: typeof Action;
    static Store: typeof Store;
    componentWillMount(): void;
    handleShowModal(): void;
    handleOk(): void;
    handleCancel(): void;
    handleBackgroundColorChange(color: any): void;
    render(): JSX.Element;
}
