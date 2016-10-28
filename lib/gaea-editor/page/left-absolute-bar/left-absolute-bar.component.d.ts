import * as React from 'react';
import * as typings from './left-absolute-bar.type';
import './left-absolute-bar.scss';
export default class LeftAbsoluteBar extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    toggleShowLayoutBorder(): void;
    toggleShowTemplate(leftBarName: string): void;
    render(): JSX.Element;
}
