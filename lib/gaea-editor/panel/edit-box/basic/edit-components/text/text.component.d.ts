import * as React from 'react';
import * as typings from './text.type';
export default class EditComponentText extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    render(): JSX.Element;
}
