import * as React from 'react';
import * as typings from './position.type';
import './position.scss';
export default class EditComponentPosition extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    componentWillMount(): void;
    handleUpdate(field: string, value: string): void;
    stringifyNumber(count: number): string;
    parseToNumber(numberc: string): number;
    getLeftOrRight(): "left" | "right";
    getTopOrBottom(): "top" | "bottom";
    handleChangePositionNumber(position: string, value: string): void;
    handleChangePosition(x: string, y: string): void;
    handleChangeZindex(value: string): void;
    render(): JSX.Element;
}
