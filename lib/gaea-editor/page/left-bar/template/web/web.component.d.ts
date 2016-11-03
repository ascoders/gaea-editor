import * as React from 'react';
import * as typings from './web.type';
export default class Web extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    componentDidMount(): void;
    render(): JSX.Element;
}
