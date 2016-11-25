import * as React from 'react';
import * as typings from './show-layout-button.type';
import './show-layout-button.scss';
export default class ShowLayoutButton extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handleClick(): void;
    render(): JSX.Element;
}
