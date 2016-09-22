import * as React from 'react';
import * as typings from './margin-padding.type';
export default class EditComponentText extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    private marginPaddingValues;
    private marginPaddingOldValue;
    componentWillMount(): void;
    handleChange(name: string, value: number): void;
    handleFinalChange(name: string, value: number): void;
    render(): JSX.Element;
}
