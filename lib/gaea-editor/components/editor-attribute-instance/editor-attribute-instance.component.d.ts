import * as React from 'react';
import * as typings from './editor-attribute-instance.type';
import './editor-attribute-instance.scss';
export default class EditorAttributeInstance extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    private ComponentClass;
    componentWillMount(): void;
    handleApplyProps(props: any): void;
    render(): JSX.Element;
}
