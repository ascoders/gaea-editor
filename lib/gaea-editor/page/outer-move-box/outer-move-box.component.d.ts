import * as React from 'react';
import * as typings from './outer-move-box.type';
import './outer-move-box.scss';
export default class OuterMoveBox extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    render(): JSX.Element;
}
