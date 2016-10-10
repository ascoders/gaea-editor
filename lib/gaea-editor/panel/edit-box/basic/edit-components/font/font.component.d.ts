import * as React from 'react';
import * as typings from './font.type';
import './font.scss';
export default class EditComponentFont extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    private colorChangeStatus;
    componentWillMount(): void;
    handleChangeFontWeight(value: string): void;
    handleChangeFontSize(value: string): void;
    handleChangeLineHeight(value: string): void;
    handleChange(field: string, value: string): void;
    handleColorChange(color: any): void;
    handleColorChangeComplete(color: any): void;
    handleChangeWrap(type: number): void;
    render(): JSX.Element;
}
