import * as React from 'react';
import * as typings from './editor-attribute-position.type';
import './editor-attribute-position.scss';
export default class EditorAttributePosition extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
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
