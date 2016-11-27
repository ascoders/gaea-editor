import * as React from 'react';
import { PropsDefine as EditorPropsDefine } from '../gaea-editor.type';
export interface ProviderContainerProps {
    gaeaProps?: EditorPropsDefine;
}
export default class ProviderContainer extends React.Component<ProviderContainerProps, any> {
    private providerActionAndStores;
    componentWillMount(): void;
    render(): JSX.Element;
}
