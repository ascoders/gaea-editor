import * as React from 'react';
import * as typings from './editor-tabs-attribute.type';
import './editor-tabs-attribute.scss';
export default class EditorTabsAttribute extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handleGaeaNameChange(value: string): void;
    handleDelete(): void;
    handleReset(): void;
    handleConfirmEditPropsEvent(): void;
    renderHeaderContainer(): JSX.Element;
    renderUpdateAttributeEvent(): JSX.Element;
    render(): JSX.Element;
}
