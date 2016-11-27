import * as React from 'react';
import * as typings from './editor-attribute-width-height.type';
import './editor-attribute-width-height.scss';
export default class EditorAttributeWidthHeight extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    renderInput(label: string, field: string): JSX.Element;
    handleChangeValue(field: string, value: string, unit: string): void;
    render(): JSX.Element;
}
