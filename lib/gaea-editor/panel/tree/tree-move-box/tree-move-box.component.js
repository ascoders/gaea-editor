"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const typings = require('./tree-move-box.type');
const mobx_react_1 = require('mobx-react');
require('./tree-move-box.scss');
let Tree = class Tree extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    render() {
        if (this.props.viewport.isMovingComponent || !this.props.viewport.treeHoverComponentSpec.hovering) {
            return null;
        }
        const style = {
            left: this.props.viewport.treeHoverComponentSpec.left,
            top: this.props.viewport.treeHoverComponentSpec.top,
            width: this.props.viewport.treeHoverComponentSpec.width - 4,
            height: this.props.viewport.treeHoverComponentSpec.height - 4,
        };
        return (React.createElement("div", {className: "_namespace", style: style}));
    }
};
Tree.defaultProps = new typings.Props();
Tree = __decorate([
    mobx_react_1.inject('viewport'),
    mobx_react_1.observer
], Tree);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tree;
