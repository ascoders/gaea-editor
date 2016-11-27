import * as React from 'react';
import * as typings from './tab-tools-components-custom.type';
import './tab-tools-components-custom.scss';
export default class TabToolsComponentsCommon extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    componentDidMount(): void;
    render(): JSX.Element;
}
