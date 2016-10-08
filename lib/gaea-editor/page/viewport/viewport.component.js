"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const ReactDOM = require('react-dom');
const typings = require('./viewport.type');
const mobx_react_1 = require('mobx-react');
require('./viewport.scss');
const index_1 = require('../../../../../common/auto-bind/index');
const edit_helper_component_1 = require('./edit-helper/edit-helper.component');
let Viewport = class Viewport extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
        this.handleAnyDomChange = () => {
            this.props.viewport.resetComponentOutline();
        };
    }
    componentDidMount() {
        this.addListener();
        window.addEventListener('resize', this.handleAnyDomChange.bind(this));
        const observer = new MutationObserver(this.handleAnyDomChange.bind(this));
        observer.observe(ReactDOM.findDOMNode(this), {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    }
    componentWillUnmount() {
        this.props.application.event.off(this.props.application.event.viewportOrTreeComponentMouseOver, this.handleViewportOrTreeComponentMouseOver);
        this.props.application.event.off(this.props.application.event.viewportOrTreeRootComponentMouseLeave, this.handleViewportOrTreeRootComponentMouseLeave);
        this.props.application.event.off(this.props.application.event.changeComponentSelectStatusEvent, this.handleChangeComponentSelectStatus);
    }
    addListener() {
        this.props.application.event.on(this.props.application.event.viewportOrTreeComponentMouseOver, this.handleViewportOrTreeComponentMouseOver);
        this.props.application.event.on(this.props.application.event.viewportOrTreeRootComponentMouseLeave, this.handleViewportOrTreeRootComponentMouseLeave);
        this.props.application.event.on(this.props.application.event.changeComponentSelectStatusEvent, this.handleChangeComponentSelectStatus);
    }
    handleViewportOrTreeComponentMouseOver(listnerContext, opts) {
        const targetInstance = this.findEditHelperByMapUniqueKey(opts.mapUniqueKey);
        targetInstance.outerMoveBoxToSelf();
    }
    findEditHelperByMapUniqueKey(mapUniqueKey) {
        const finderPath = this.props.viewport.findComponentPathFromRoot(mapUniqueKey);
        let targetInstance = this.refs[`edit-${this.props.viewport.rootMapUniqueKey}`]['wrappedInstance'];
        finderPath.forEach(path => {
            targetInstance = targetInstance.refs[`edit-${path}`]['wrappedInstance'];
        });
        return targetInstance;
    }
    handleViewportOrTreeRootComponentMouseLeave() {
        this.props.viewport.setLeaveHover();
    }
    handleChangeComponentSelectStatus(listnerContext, opts) {
        const targetInstance = this.findEditHelperByMapUniqueKey(opts.mapUniqueKey);
        targetInstance.setSelect(opts.selected);
    }
    getRootRef(ref) {
        this.props.viewport.setViewportDomInstance(ReactDOM.findDOMNode(ref));
    }
    handleMouseLeave(event) {
        event.stopPropagation();
        this.props.application.event.emit(this.props.application.event.viewportOrTreeRootComponentMouseLeave, {
            mapUniqueKey: this.props.viewport.rootMapUniqueKey,
            type: 'component'
        });
        this.props.viewport.setHoveringComponentMapUniqueKey(null);
    }
    render() {
        const style = {
            display: this.props.application.isPreview && 'none'
        };
        return (React.createElement("div", {className: "nt-editor-gaea-editor-gaea_editor-page-viewport", style: style, onMouseLeave: this.handleMouseLeave, ref: this.getRootRef}, React.createElement(edit_helper_component_1.default, {mapUniqueKey: this.props.viewport.rootMapUniqueKey, ref: `edit-${this.props.viewport.rootMapUniqueKey}`})));
    }
};
Viewport.defaultProps = new typings.Props();
__decorate([
    index_1.autoBindMethod
], Viewport.prototype, "addListener", null);
__decorate([
    index_1.autoBindMethod
], Viewport.prototype, "handleViewportOrTreeComponentMouseOver", null);
__decorate([
    index_1.autoBindMethod
], Viewport.prototype, "findEditHelperByMapUniqueKey", null);
__decorate([
    index_1.autoBindMethod
], Viewport.prototype, "handleViewportOrTreeRootComponentMouseLeave", null);
__decorate([
    index_1.autoBindMethod
], Viewport.prototype, "handleChangeComponentSelectStatus", null);
__decorate([
    index_1.autoBindMethod
], Viewport.prototype, "getRootRef", null);
__decorate([
    index_1.autoBindMethod
], Viewport.prototype, "handleMouseLeave", null);
Viewport = __decorate([
    mobx_react_1.inject('application', 'viewport'),
    mobx_react_1.observer
], Viewport);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Viewport;
