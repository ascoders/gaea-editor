import * as React from 'react';
import * as typings from './overflow.type';
import './overflow.scss';
export default class EditComponentOverflow extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: typings.PropsDefine): void;
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
