import * as React from 'react';
import * as typings from './editor-attribute-text.type';
import './editor-attribute-text.scss';
export default class EditorAttributeText extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handleChange(value: string): void;
    render(): JSX.Element;
}
