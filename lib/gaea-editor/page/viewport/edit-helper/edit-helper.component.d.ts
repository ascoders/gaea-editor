import * as React from 'react';
import * as typings from './edit-helper.type';
import './edit-helper.scss';
export default class EditHelper extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    wrappedInstance: React.ReactInstance;
    static ObserveEditHelper: typeof EditHelper;
    private ComponentClass;
    private componentInfo;
    private domInstance;
    private startDrag;
    private lastClientX;
    private lastClientY;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUpdate(nextProps: typings.PropsDefine, nextState: typings.StateDefine): void;
    componentWillUnmount(): void;
    updateDom(): void;
    setDragableClassIfNeed(): void;
    setLayoutClassIfCanDragIn(): void;
    handleMouseOver(event: MouseEvent): void;
    outerMoveBoxToSelf(): void;
    handleClick(event: MouseEvent): void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseUp(event: MouseEvent): void;
    render(): React.ReactElement<any>;
}
