import * as React from 'react';
import * as typings from './crumbs.type';
import './crumbs.scss';
export default class Crumbs extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handleClick(mapUniqueKey: string): void;
    handleHover(mapUniqueKey: string): void;
    handleMouseLeave(): void;
    render(): JSX.Element;
}
