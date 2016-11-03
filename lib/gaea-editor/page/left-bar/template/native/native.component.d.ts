import * as React from 'react';
import * as typings from './native.type';
export default class Native extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    componentDidMount(): void;
    render(): JSX.Element;
}
