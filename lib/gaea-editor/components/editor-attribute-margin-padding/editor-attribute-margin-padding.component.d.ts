import * as React from 'react';
import * as typings from './editor-attribute-margin-padding.type';
import './editor-attribute-margin-padding.scss';
export default class EditorAttributeMarginPadding extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handleStart(): void;
    handleChange(name: string, value: number): void;
    handleFinalChange(name: string, value: number): void;
    render(): JSX.Element;
}
