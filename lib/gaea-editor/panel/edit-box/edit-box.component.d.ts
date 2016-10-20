import * as React from 'react';
import * as typings from './edit-box.type';
import './edit-box.scss';
export default class EditBox extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private domInstance;
    componentDidMount(): void;
    handleCloseClick(): void;
    render(): JSX.Element;
}
