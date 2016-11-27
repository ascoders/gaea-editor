import * as React from 'react';
import * as typings from './editor-attribute-border.type';
import './editor-attribute-border.scss';
export default class EditorAttributeBorder extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    private colorChangeStatus;
    private colorHasChange;
    getCommonBorderRadius(): number;
    handleCommonBorderRadiusChange(value: string): void;
    handleRadiusClick(position: string): void;
    getCommonBorder(): {
        style: string;
        width: number;
        color: string;
    };
    handleBorderClick(position: string): void;
    handleBorderStyleChange(style: string): void;
    handleBorderColorChange(color: any): void;
    handleBorderColorChangeComplete(): void;
    handleBorderWidthChange(value: string): void;
    render(): JSX.Element;
}
