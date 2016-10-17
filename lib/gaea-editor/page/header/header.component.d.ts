import * as React from 'react';
import * as typings from './header.type';
import './header.scss';
export default class Header extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    componentWillMount(): void;
    componentWillUnmount(): void;
    handleSave(): boolean;
    handlePreview(): void;
    undo(): boolean;
    redo(): boolean;
    del(): void;
    copy(): boolean;
    paste(): boolean;
    handleChangeViewportWidth(width: number): void;
    handleChangeViewportWidthByRange(event: any): void;
    render(): JSX.Element;
}
