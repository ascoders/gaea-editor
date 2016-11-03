import * as React from 'react';
import * as typings from './variable.type';
import './variable.scss';
export default class EditComponentVariable extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    componentWillMount(): void;
    handleShowModal(): void;
    handleOk(): void;
    handleCancel(): void;
    handleSelectExternalParameter(externalParameter: FitGaea.ExternalParameter): void;
    render(): JSX.Element;
}
