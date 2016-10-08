"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const ReactDOM = require('react-dom');
const typings = require('./edit-box.type');
const mobx_react_1 = require('mobx-react');
const index_1 = require('../../../../../common/auto-bind/index');
const index_2 = require('../../../../../web-common/tabs/index');
const basic_component_1 = require('./basic/basic.component');
const script_component_1 = require('./script/script.component');
require('./edit-box.scss');
let EditBox = class EditBox extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    componentDidMount() {
        this.domInstance = ReactDOM.findDOMNode(this);
    }
    handleCloseClick() {
        this.props.viewport.cancelEditComponent();
    }
    render() {
        if (this.props.viewport.currentEditComponentMapUniqueKey === null) {
            return null;
        }
        const itemStyle = {
            height: `calc(100% - ${this.props.application.footerHeight}px)`,
            flexGrow: 0
        };
        return (React.createElement("div", {className: "_namespace container-box"}, React.createElement("span", {className: "handle-drag-close", onClick: this.handleCloseClick}, "x"), React.createElement(index_2.Tabs, {defaultActiveKey: "basic", type: "retro", className: "edit-box-handle"}, React.createElement(index_2.TabPanel, {tab: "基础", style: itemStyle, activeKey: "basic", className: "edit-container"}, React.createElement(basic_component_1.default, null)), React.createElement(index_2.TabPanel, {tab: "脚本", style: itemStyle, activeKey: "script", className: "edit-container"}, React.createElement(script_component_1.default, null)))));
    }
};
EditBox.defaultProps = new typings.Props();
__decorate([
    index_1.autoBindMethod
], EditBox.prototype, "handleCloseClick", null);
EditBox = __decorate([
    mobx_react_1.inject('application', 'viewport'),
    mobx_react_1.observer
], EditBox);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditBox;
