import * as React from 'react';
import * as typings from './drag-source.type';
import './drag-source.scss';
export default class DragSourceComponent extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    handleMouseEnter(): void;
    handleMouseLeave(): void;
    render(): JSX.Element;
}
