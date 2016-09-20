import * as React from 'react';
import * as typings from './gaea.type';
export default class Gaea extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    render(): JSX.Element;
}
