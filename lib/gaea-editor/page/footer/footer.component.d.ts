import * as React from 'react';
import * as typings from './footer.type';
import './footer.scss';
export default class Footer extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    handleClick(mapUniqueKey: string): void;
    render(): JSX.Element;
}
