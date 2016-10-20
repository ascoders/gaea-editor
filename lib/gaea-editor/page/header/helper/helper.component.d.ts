import * as React from 'react';
import * as typings from './helper.type';
import './helper.scss';
export default class Helper extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    handleShowModal(): void;
    handleOk(): void;
    handleCancel(): void;
    renderOperateButton(triggerOk: any, triggerCancel: Function): JSX.Element;
    render(): JSX.Element;
}
