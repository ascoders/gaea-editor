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
const typings = require('./switch.type');
const mobx_react_1 = require('mobx-react');
require('./switch.scss');
const index_1 = require('../../../../../../../../web-common/switch/index');
let EditComponentSwitch = class EditComponentSwitch extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
        const switchOpts = {
            disabled: !this.props.editOption.editable,
            checked: Boolean(this.props.viewport.getPropsByFieldWithEditor(this.componentInfo.props, this.props.editOption)),
            onChange: (checked) => {
                this.props.viewport.updateComponentOptionsValue(this.props.editOption, checked);
            }
        };
        return (React.createElement(index_1.default, __assign({}, switchOpts)));
    }
};
EditComponentSwitch.defaultProps = new typings.Props();
EditComponentSwitch = __decorate([
    mobx_react_1.inject('viewport'),
    mobx_react_1.observer
], EditComponentSwitch);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentSwitch;
