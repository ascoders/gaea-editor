import * as React from 'react';
import * as typings from './edit-helper.type';
import './edit-helper.scss';
export default class EditHelper extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static ObserveEditHelper: typeof EditHelper;
    private SelfComponent;
    private componentInfo;
    private selfInstance;
    private selfDomInstance;
    private sortable;
    private isMovingComponent;
    componentWillReact(): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUpdate(nextProps: typings.PropsDefine, nextState: typings.StateDefine): void;
    componentWillUnmount(): void;
    setLayoutActive(): void;
    setDraggingClass(): void;
    setSelectStyle(nextState: typings.StateDefine): void;
    handleMouseOver(event: MouseEvent): void;
    outerMoveBoxToSelf(): void;
    setSelect(selected: boolean): void;
    handleClick(event: MouseEvent): void;
    render(): React.ReactElement<any>;
}
