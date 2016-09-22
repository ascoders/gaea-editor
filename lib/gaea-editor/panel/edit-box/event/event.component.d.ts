import * as React from 'react';
import * as typings from './event.type';
export default class EditBoxEvent extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    render(): JSX.Element;
}
