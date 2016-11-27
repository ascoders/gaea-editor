import * as React from 'react';
import * as typings from './editor-attribute-layout.type';
import './editor-attribute-layout.scss';
export default class EditorAttributeLayout extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handleUpdateValue(field: string, value: FitGaea.ComponentPropsOptionValue): void;
    handleChangeReverse(checked: boolean): void;
    handleFlexGrowChange(value: string): void;
    renderFlex(): JSX.Element;
    renderDisplay(): JSX.Element;
    render(): JSX.Element;
}
