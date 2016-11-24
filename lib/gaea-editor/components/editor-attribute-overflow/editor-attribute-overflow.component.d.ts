import * as React from 'react';
import * as typings from './editor-attribute-overflow.type';
import './editor-attribute-overflow.scss';
export default class EditorAttributeOverflow extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    isOverflowXYEqual(): boolean;
    init(props: typings.PropsDefine): void;
    isStatu(statu: string): boolean;
    handleUpdateCompressValue(field: string, value: FitGaea.ComponentPropsOptionValue): void;
    handleUpdateExpandValue(field: string, value: FitGaea.ComponentPropsOptionValue): void;
    handleExpand(): void;
    handleCompress(): void;
    renderOverflow(): JSX.Element;
    isExpandStatu(field: string, statu: string): boolean;
    renderOverflowExpand(): JSX.Element;
    render(): JSX.Element;
}
