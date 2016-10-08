"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const typings = require('./number.type');
const mobx_react_1 = require('mobx-react');
const index_1 = require('../../../../../../../../web-common/number/index');
require('./number.scss');
const parseInputToOutRange = (value, inputRange, outputRange) => {
    if (value >= inputRange[0] && value <= inputRange[1]) {
        const percentage = (value - inputRange[0]) / (inputRange[1] - inputRange[0]);
        const outputLength = (outputRange[1] - outputRange[0]) * percentage;
        value = outputLength + outputRange[0];
    }
    return value;
};
let EditComponentNumber = class EditComponentNumber extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    handleChangeValue(value, unit) {
        let outputValue = parseFloat(value);
        if (this.props.editOption.number.inputRange && this.props.editOption.number.outputRange) {
            outputValue = parseInputToOutRange(outputValue, this.props.editOption.number.inputRange, this.props.editOption.number.outputRange);
        }
        if (unit !== '') {
            this.props.viewport.updateComponentOptionsValue(this.props.editOption, outputValue.toString() + unit);
        }
        else {
            this.props.viewport.updateComponentOptionsValue(this.props.editOption, outputValue);
        }
    }
    handleChange(event) {
        this.handleChangeValue(event.target.value, this.state.unit);
    }
    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
        let inputValue = this.props.viewport.getPropsByFieldWithEditor(this.componentInfo.props, this.props.editOption);
        if (inputValue !== '') {
            inputValue = parseInputToOutRange(parseFloat(inputValue), this.props.editOption.number.outputRange, this.props.editOption.number.inputRange).toString();
        }
        const disabled = !this.props.editOption.editable;
        const textOpts = {
            label: '',
            disabled: disabled,
            value: inputValue,
            onChange: (value, unit) => {
                this.handleChangeValue(value, unit);
                this.setState({
                    unit: unit
                });
            }
        };
        if (this.props.editOption.number.slider) {
            return (React.createElement("div", {className: "_namespace"}, React.createElement("input", {className: "range", max: this.props.editOption.number.max, min: this.props.editOption.number.min, step: this.props.editOption.number.step, value: inputValue, disabled: disabled, onChange: this.handleChange.bind(this), type: "range"}), React.createElement(index_1.default, __assign({}, this.props.editOption.number, textOpts))));
        }
        else {
            return (React.createElement(index_1.default, __assign({}, this.props.editOption.number, textOpts)));
        }
    }
};
EditComponentNumber.defaultProps = new typings.Props();
EditComponentNumber = __decorate([
    mobx_react_1.inject('viewport'),
    mobx_react_1.observer
], EditComponentNumber);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentNumber;
