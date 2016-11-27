import * as React from 'react';
import * as typings from './editor-attribute-number.type';
import './editor-attribute-number.scss';
export default class EditorAttributeNumber extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handleChangeValue(value: string, unit: string): void;
    handleChange(event: any): void;
    render(): JSX.Element;
}
