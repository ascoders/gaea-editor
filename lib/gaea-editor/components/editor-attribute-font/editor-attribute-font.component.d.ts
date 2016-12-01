import * as React from 'react';
import * as typings from './editor-attribute-font.type';
import './editor-attribute-font.scss';
export default class EditorAttributeFont extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    private colorChangeStatus;
    handleChangeFontWeight(value: string): void;
    handleChangeFontSize(value: string): void;
    handleChangeLineHeight(value: string): void;
    handleChange(field: string, value: string): void;
    handleColorChange(color: any): void;
    handleColorChangeComplete(color: any): void;
    handleChangeWrap(type: number): void;
    render(): JSX.Element;
}
