import * as React from 'react';
import * as typings from './gaea-editor.type';
import './gaea-editor.scss';
export default class GaeaEditor extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    render(): JSX.Element;
}
