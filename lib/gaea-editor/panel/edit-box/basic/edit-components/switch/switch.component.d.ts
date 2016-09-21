import * as React from 'react';
import * as typings from './switch.type';
import './switch.scss';
export default class EditComponentSwitch extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    render(): JSX.Element;
}
