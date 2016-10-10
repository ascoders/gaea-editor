import * as React from 'react';
import * as typings from './instance.type';
import './instance.scss';
export default class EditComponentInstance extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    private ComponentClass;
    componentWillMount(): void;
    handleApplyProps(props: any): void;
    render(): JSX.Element;
}
