import * as React from 'react';
import * as typings from './gaea-editor.type';
export default class GaeaEditor extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private application;
    private viewport;
    private setting;
    componentWillMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: typings.PropsDefine): void;
    setPropsToApplication(props: typings.PropsDefine): void;
    getRootRef(ref: React.ReactInstance): void;
    addListener(): void;
    removeListener(): void;
    handleOnSave(context: any, componentsInfo: string): void;
    handleOnGetPublishList(context: any, page: number): void;
    handleOnPublish(context: any, versionInfo: FitGaea.GetPublishListResult): void;
    handleOnPreviewVersion(context: any, version: string): void;
    handleOnSwitchVersion(context: any, version: string): void;
    render(): JSX.Element;
}
