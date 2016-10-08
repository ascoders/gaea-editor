"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const typings = require('./array.type');
const mobx_react_1 = require('mobx-react');
let EditComponentText = class EditComponentText extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    render() {
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
        return (React.createElement("div", null));
    }
};
EditComponentText.defaultProps = new typings.Props();
EditComponentText = __decorate([
    mobx_react_1.inject('viewport'),
    mobx_react_1.observer
], EditComponentText);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentText;
