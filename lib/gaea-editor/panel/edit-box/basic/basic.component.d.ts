import * as React from 'react';
import * as typings from './basic.type';
import './basic.scss';
export default class EditBoxBasic extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    resetOptions(): void;
    handleChangeName(value: string): void;
    titleInputRightRender(): JSX.Element;
    handleConfirmEditProps(): void;
    render(): JSX.Element;
}
