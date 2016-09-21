import * as React from 'react';
import * as typings from './tree-move-box.type';
import './tree-move-box.scss';
export default class Tree extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    render(): JSX.Element;
}
