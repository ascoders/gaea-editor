import * as React from 'react';
import * as typings from './background.type';
import './background.scss';
export default class EditComponentBackground extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    private colorChangeStatus;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: typings.PropsDefine): void;
    init(props: typings.PropsDefine): void;
    handleColorPickerClick(): void;
    handleClose(): void;
    handleColorChange(color: any): void;
    handleColorChangeComplete(color: any): void;
    render(): JSX.Element;
}
