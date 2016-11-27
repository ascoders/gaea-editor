import * as React from 'react';
import * as typings from './guideline.type';
import './guideline.scss';
export default class Guideline extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    componentWillReact(): void;
    render(): JSX.Element;
}
