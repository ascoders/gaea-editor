import * as React from 'react';
import * as typings from './publish.type';
import './publish.scss';
export default class Publish extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    componentWillMount(): void;
    componentWillReact(): void;
    initVersion(): void;
    getNextVersion(): {
        nextPatch: string;
        nextMinor: string;
        nextMajor: string;
    };
    handleShowModal(): void;
    handleOk(): void;
    handleCancel(): void;
    handleSelectChange(version: string): void;
    render(): JSX.Element;
}
