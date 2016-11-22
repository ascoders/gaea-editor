import * as React from 'react';
import * as typings from './editor-tabs.type';
import './editor-tabs.scss';
export default class EditorTabs extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    render(): JSX.Element;
}
