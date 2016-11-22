import * as React from 'react';
import * as typings from './color.type';
import './color.scss';
export default class Color extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    handleColorChange(color: any): void;
    handleColorChangeComplete(color: any): void;
    titleRender(): JSX.Element;
    render(): JSX.Element;
}
