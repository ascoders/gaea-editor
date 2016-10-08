import * as React from 'react';
import * as typings from './layout.type';
import './layout.scss';
export default class EditComponentText extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    componentWillMount(): void;
    handleUpdateValue(field: string, value: FitGaea.ComponentPropsOptionValue): void;
    handleChangeReverse(checked: boolean): void;
    handleFlexGrowChange(value: string): void;
    renderFlex(): JSX.Element;
    renderDisplay(): JSX.Element;
    render(): JSX.Element;
}
