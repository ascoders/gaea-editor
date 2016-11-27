import * as React from 'react';
import * as typings from './external-variable-button.type';
import './external-variable-button.scss';
export default class ExternalVariable extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handleClick(): void;
    render(): JSX.Element;
}
