import * as React from 'react';
import * as typings from './select.type';
export default class EditComponentSelect extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    render(): JSX.Element;
}
