import * as React from 'react';
import * as typings from './preview.type';
import './preview.scss';
export default class Preview extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handlePreview(): void;
    render(): JSX.Element;
}
