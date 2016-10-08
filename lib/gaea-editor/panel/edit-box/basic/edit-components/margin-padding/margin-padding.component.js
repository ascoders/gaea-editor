"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const typings = require('./margin-padding.type');
const mobx_react_1 = require('mobx-react');
const index_1 = require('../../../../../../../../web-common/margin-padding-editor/index');
require('./margin-padding.scss');
let EditComponentText = class EditComponentText extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
    }
    handleStart() {
        this.props.viewport.prepareWriteHistory();
    }
    handleChange(name, value) {
        this.props.viewport.updateComponentValueWithNoHistory(`style.${name}`, value);
    }
    handleFinalChange(name, value) {
        this.props.viewport.updateComponentValueWithNoHistory(`style.${name}`, value);
        this.props.viewport.writeHistory();
    }
    render() {
        return (React.createElement("div", {className: "_namespace"}, React.createElement(index_1.default, {size: 220, onStart: this.handleStart.bind(this), marginLeft: this.componentInfo.props.style.marginLeft, marginTop: this.componentInfo.props.style.marginTop, marginRight: this.componentInfo.props.style.marginRight, marginBottom: this.componentInfo.props.style.marginBottom, paddingLeft: this.componentInfo.props.style.paddingLeft, paddingTop: this.componentInfo.props.style.paddingTop, paddingRight: this.componentInfo.props.style.paddingRight, paddingBottom: this.componentInfo.props.style.paddingBottom, onChange: this.handleChange.bind(this), onFinalChange: this.handleFinalChange.bind(this)})));
    }
};
EditComponentText.defaultProps = new typings.Props();
EditComponentText = __decorate([
    mobx_react_1.inject('viewport'),
    mobx_react_1.observer
], EditComponentText);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentText;
