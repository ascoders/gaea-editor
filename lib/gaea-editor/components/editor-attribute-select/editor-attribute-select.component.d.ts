import * as React from 'react';
import * as typings from './editor-attribute-select.type';
import './editor-attribute-select.scss';
export default class EditorAttributeSelect extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handleChange(value: string): void;
    render(): JSX.Element;
}
