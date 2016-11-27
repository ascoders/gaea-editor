import * as React from 'react';
import * as typings from './external-variable-editor-label.type';
import './external-variable-editor-label.scss';
export default class ExternalVariableEditorLabel extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    static position: string;
    handleUseVariable(): void;
    handleCancelVariable(): void;
    render(): JSX.Element;
}
