import * as React from 'react';
import * as typings from './gaea-editor.type';
export default class GaeaEditor extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private applicationStore;
    private viewport;
    private setting;
    private handleOnSaveBind;
    componentWillMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: typings.PropsDefine): void;
    setPropsToApplication(props: typings.PropsDefine): void;
    getRootRef(ref: React.ReactInstance): void;
    addListener(): void;
    removeListener(): void;
    handleOnSave(context: any, componentsInfo: {
        [mapUniqueKey: string]: FitGaea.ViewportComponentInfo;
    }): void;
    render(): JSX.Element;
}
