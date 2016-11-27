import * as React from 'react';
import * as typings from './editor-attribute-switch.type';
import './editor-attribute-switch.scss';
export default class EditorAttributeSelect extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handleChange(checked: boolean): void;
    render(): JSX.Element;
}
