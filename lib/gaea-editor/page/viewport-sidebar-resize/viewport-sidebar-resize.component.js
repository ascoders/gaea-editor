"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const typings = require('./viewport-sidebar-resize.type');
const mobx_react_1 = require('mobx-react');
const _ = require('lodash');
require('./viewport-sidebar-resize.scss');
let ViewportSidebarResize = class ViewportSidebarResize extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }
    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.state, nextState);
    }
    handleMouseMove(event) {
        if (!this.props.application.isSidebarMoving)
            return;
        this.props.application.setSidebarWidth(this.props.application.sidebarWidth - event.movementX);
    }
    handleMouseDown() {
        this.props.application.setSidebarMoving(true);
    }
    handleMouseUp() {
        this.props.application.setSidebarMoving(false);
    }
    render() {
        return (React.createElement("div", {className: "_namespace", onMouseDown: this.handleMouseDown.bind(this)}));
    }
};
ViewportSidebarResize.defaultProps = new typings.Props();
ViewportSidebarResize = __decorate([
    mobx_react_1.inject('application'),
    mobx_react_1.observer
], ViewportSidebarResize);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewportSidebarResize;
