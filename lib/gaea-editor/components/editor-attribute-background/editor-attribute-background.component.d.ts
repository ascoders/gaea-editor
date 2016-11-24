import * as React from 'react';
import * as typings from './editor-attribute-background.type';
import './editor-attribute-background.scss';
export default class EditorAttributeBackground extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handleBackgroundColorChange(color: any): void;
    render(): JSX.Element;
}
