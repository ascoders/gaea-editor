"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const typings = require('./script.type');
const mobx_react_1 = require('mobx-react');
const index_1 = require('../../../../../../web-common/button/index');
let Codemirror = {};
if (window) {
    Codemirror = require('react-codemirror');
    require('codemirror/lib/codemirror.css');
    require('codemirror/mode/javascript/javascript');
}
const defaultValue = _.trim(`
/**
 * 初始化函数,在组件创建时系统自动调用
 */
function componentWillMount() {

}

/**
 * 初始化函数,在组件 DOM 节点创建后系统自动调用
 */
function componentDidMount() {

}

/**
 * 析构函数,在组件销毁时系统自动调用
 */
function componentWillUnmount() {

}
`);
const codeMirrorOpts = {
    lineNumbers: true,
    readOnly: false,
    mode: 'javascript',
    theme: 'default',
    tabSize: 2
};
let EditBoxScript = class EditBoxScript extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    handleCodeChange() {
    }
    render() {
        return (React.createElement("div", {className: "_namespace"}, React.createElement(Codemirror, {onChange: this.handleCodeChange, defaultValue: defaultValue, options: codeMirrorOpts}), React.createElement(index_1.ButtonGroup, null, React.createElement(index_1.Button, {active: true}, "test"))));
    }
};
EditBoxScript.defaultProps = new typings.Props();
EditBoxScript = __decorate([
    mobx_react_1.observer
], EditBoxScript);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditBoxScript;
