import * as React from 'react';
import * as typings from './edit-item.type';
export default class EditBoxBasic extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    componentWillMount(): void;
    init(): void;
    handleChangeVariable(isIn: boolean): void;
    render(): JSX.Element;
}
