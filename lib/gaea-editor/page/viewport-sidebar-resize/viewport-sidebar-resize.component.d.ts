import * as React from 'react';
import * as typings from './viewport-sidebar-resize.type';
import './viewport-sidebar-resize.scss';
export default class ViewportSidebarResize extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    handleMouseMove(event: MouseEvent): void;
    handleMouseDown(): void;
    handleMouseUp(): void;
    render(): JSX.Element;
}
