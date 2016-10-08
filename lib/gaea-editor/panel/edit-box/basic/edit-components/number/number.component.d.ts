import * as React from 'react';
import * as typings from './number.type';
import './number.scss';
export default class EditComponentNumber extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    handleChangeValue(value: string, unit: string): void;
    handleChange(event: any): void;
    render(): JSX.Element;
}
