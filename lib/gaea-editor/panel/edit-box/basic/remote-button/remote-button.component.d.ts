import * as React from 'react';
import * as typings from './remote-button.type';
export default class RemoveButton extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    handleShowModalOrClick(): void;
    handleOk(): void;
    handleCancel(): void;
    render(): JSX.Element;
}
