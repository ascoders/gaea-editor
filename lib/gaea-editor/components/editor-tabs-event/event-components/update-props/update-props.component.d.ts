import * as React from 'react';
import * as typings from './update-props.type';
import './update-props.scss';
export default class UpdatePropsEvent extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    handleClick(): void;
    render(): JSX.Element;
}
