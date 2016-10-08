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
const typings = require('./text.type');
const mobx_react_1 = require('mobx-react');
const index_1 = require('../../../../../../../../web-common/input/index');
let EditComponentText = class EditComponentText extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
        const textOpts = {
            label: '',
            disabled: !this.props.editOption.editable,
            value: this.props.viewport.getPropsByFieldWithEditor(this.componentInfo.props, this.props.editOption),
            onChange: (value) => {
                this.props.viewport.updateComponentOptionsValue(this.props.editOption, value);
            }
        };
        return (React.createElement(index_1.default, __assign({}, textOpts)));
    }
};
EditComponentText.defaultProps = new typings.Props();
EditComponentText = __decorate([
    mobx_react_1.inject('viewport'),
    mobx_react_1.observer
], EditComponentText);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentText;
