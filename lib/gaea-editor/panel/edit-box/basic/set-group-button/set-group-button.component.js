"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const typings = require('./set-group-button.type');
const mobx_react_1 = require('mobx-react');
const index_1 = require('../../../../../../../web-common/modal/index');
const index_2 = require('../../../../../../../web-common/button/index');
const index_3 = require('../../../../../../../web-common/input/index');
require('./set-group-button.scss');
let SetGroupButton = class SetGroupButton extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    handleShowModal() {
        this.setState({
            show: true
        });
    }
    handleOk() {
        const fullInfo = this.props.viewport.getComponentFullInfoByMapUniqueKey(this.props.viewport.currentEditComponentMapUniqueKey);
        this.props.application.addComboComponent({
            name: this.state.name,
            mapUniqueKey: fullInfo.mapUniqueKey,
            componentInfo: fullInfo.componentInfo,
            childs: fullInfo.childs
        });
        this.setState({
            show: false,
            name: ''
        });
    }
    handleCancel() {
        this.setState({
            show: false,
            name: ''
        });
    }
    handleChangeName(value) {
        this.setState({
            name: value
        });
    }
    render() {
        return (React.createElement(index_2.default, {onClick: this.handleShowModal.bind(this)}, "设为组合", React.createElement(index_1.default, {className: "_namespace", show: this.state.show, onOk: this.handleOk.bind(this), onCancel: this.handleCancel.bind(this)}, React.createElement(index_3.default, {onChange: this.handleChangeName.bind(this), label: "输入组名"}), React.createElement("p", {className: "description"}, "设为组合的元素,会在右侧『组件』栏中『组合』选项中出现."))));
    }
};
SetGroupButton.defaultProps = new typings.Props();
SetGroupButton = __decorate([
    mobx_react_1.inject('viewport', 'application'),
    mobx_react_1.observer
], SetGroupButton);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SetGroupButton;
