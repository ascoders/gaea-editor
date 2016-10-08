import * as React from 'react';
import * as typings from './width-height.type';
import './width-height.scss';
export default class EditComponentWidthHeight extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    componentWillMount(): void;
    renderInput(label: string, field: string): JSX.Element;
    handleChangeValue(field: string, value: string, unit: string): void;
    render(): JSX.Element;
}
