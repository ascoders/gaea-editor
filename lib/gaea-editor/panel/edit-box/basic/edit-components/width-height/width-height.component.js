"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const typings = require('./width-height.type');
const mobx_react_1 = require('mobx-react');
const _ = require('lodash');
const index_1 = require('../../../../../../../../web-common/number/index');
require('./width-height.scss');
const parseInputValue = (value, unit) => {
    if (value === '') {
        return null;
    }
    else if (unit === '') {
        return parseInt(value);
    }
    else {
        return value + unit;
    }
};
let EditComponentWidthHeight = class EditComponentWidthHeight extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
    }
    renderInput(label, field) {
        const units = this.props.application.isReactNative ? null : [{
                key: '',
                value: 'px'
            }, {
                key: '%',
                value: '%'
            }];
        const currentUnit = this.props.application.isReactNative ? null : _.endsWith(this.componentInfo.props.style[field], '%') ? '%' : '';
        return (React.createElement("div", {className: "input-container"}, React.createElement("span", {className: "input-container-label"}, label), React.createElement(index_1.Number, {label: "", value: this.componentInfo.props.style[field] || '', placeholder: "null", units: units, currentUnit: currentUnit, onChange: this.handleChangeValue.bind(this, field)})));
    }
    handleChangeValue(field, value, unit) {
        this.setState({
            [field]: value
        });
        if (this.props.application.isReactNative) {
            this.props.viewport.updateComponentValue(`style.${field}`, parseInt(value));
        }
        else {
            this.props.viewport.updateComponentValue(`style.${field}`, parseInputValue(value, unit));
        }
    }
    render() {
        return (React.createElement("div", {className: "_namespace"}, React.createElement("div", {className: "line"}, React.createElement("div", {className: "container-left"}, this.renderInput('宽度', 'width')), React.createElement("div", {className: "container-right"}, this.renderInput('高度', 'height'))), React.createElement("div", {className: "line"}, React.createElement("div", {className: "container-left"}, this.renderInput('max', 'maxWidth')), React.createElement("div", {className: "container-right"}, this.renderInput('max', 'maxHeight'))), React.createElement("div", {className: "line"}, React.createElement("div", {className: "container-left"}, this.renderInput('min', 'minWidth')), React.createElement("div", {className: "container-right"}, this.renderInput('min', 'minHeight')))));
    }
};
EditComponentWidthHeight.defaultProps = new typings.Props();
EditComponentWidthHeight = __decorate([
    mobx_react_1.inject('viewport', 'application'),
    mobx_react_1.observer
], EditComponentWidthHeight);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentWidthHeight;
