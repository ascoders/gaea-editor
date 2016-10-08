"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const typings = require('./background.type');
const mobx_react_1 = require('mobx-react');
const react_color_1 = require('react-color');
require('./background.scss');
let EditComponentBackground = class EditComponentBackground extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
        this.init(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }
    init(props) {
    }
    handleColorPickerClick() {
        this.setState({
            displayColorPicker: !this.state.displayColorPicker
        });
    }
    handleClose() {
        this.setState({
            displayColorPicker: false
        });
    }
    handleColorChange(color) {
        this.props.viewport.prepareWriteHistory();
        this.props.viewport.updateComponentValueWithNoHistory('style.backgroundColor', `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
    }
    handleColorChangeComplete(color) {
        this.props.viewport.updateComponentValueWithNoHistory('style.backgroundColor', `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
        this.props.viewport.writeHistory();
    }
    render() {
        const shadow = {
            position: 'absolute',
            left: -1000,
            top: -1000,
            width: 10000,
            height: 10000,
            zIndex: 99
        };
        return (React.createElement("div", {className: "_namespace"}, React.createElement("div", {className: "row-container"}, React.createElement("i", {className: "fa fa-eyedropper icon-content"}), React.createElement("div", {className: "color-picker-container"}, React.createElement("div", {className: "color-picker-label-container", onClick: this.handleColorPickerClick.bind(this)}, React.createElement("div", {className: "color-picker-label", style: { backgroundColor: this.componentInfo.props.style.backgroundColor }})), this.state.displayColorPicker &&
            React.createElement("div", null, React.createElement("div", {style: shadow, onClick: this.handleClose.bind(this)}), React.createElement("div", {className: "picker-container"}, React.createElement(react_color_1.ChromePicker, {label: "hex", onChange: this.handleColorChange.bind(this), onChangeComplete: this.handleColorChangeComplete.bind(this), color: this.componentInfo.props.style.backgroundColor || 'transparent'})))))));
    }
};
EditComponentBackground.defaultProps = new typings.Props();
EditComponentBackground = __decorate([
    mobx_react_1.inject('viewport'),
    mobx_react_1.observer
], EditComponentBackground);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentBackground;
