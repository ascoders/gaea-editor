import * as React from 'react';
import * as typings from './border.type';
import './border.scss';
export default class EditComponentBorder extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    private colorChangeStatus;
    private colorHasChange;
    componentWillMount(): void;
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
