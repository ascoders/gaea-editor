"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const ReactDOM = require('react-dom');
const typings = require('./tree.type');
const mobx_react_1 = require('mobx-react');
const $ = require('jquery');
const index_1 = require('../../../../../web-common/tree/index');
const index_2 = require('../../../../../common/auto-bind/index');
const tree_element_component_1 = require('./tree-element/tree-element.component');
const tree_move_box_component_1 = require('./tree-move-box/tree-move-box.component');
require('./tree.scss');
let Tree = class Tree extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    componentDidMount() {
        this.childDomInstance = ReactDOM.findDOMNode(this.childInstance);
        this.props.viewport.setTreeDomInstance(this.childDomInstance);
        this.addListener();
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
        if (opts.type !== 'tree' && this.props.viewport.lastSelectMapUniqueKey === null) {
            this.scrollToChildren(targetInstance);
        }
    }
    scrollToChildren(child) {
        const $domTree = $(ReactDOM.findDOMNode(this));
        const $treeInstance = $(child.getDomInstance());
        $domTree.stop().animate({
            scrollTop: $treeInstance.offset().top - $domTree.offset().top + $domTree.scrollTop() - 50
        }, 100);
    }
    findEditHelperByMapUniqueKey(mapUniqueKey) {
        const finderPath = this.props.viewport.findComponentPathFromRoot(mapUniqueKey);
        let targetInstance = this.refs[`tree-${this.props.viewport.rootMapUniqueKey}`]['wrappedInstance'];
        finderPath.forEach(path => {
            targetInstance = targetInstance.refs[`tree-${path}`]['wrappedInstance'];
        });
        return targetInstance;
    }
    handleViewportOrTreeRootComponentMouseLeave() {
        this.props.viewport.setTreeLeaveHover();
    }
    handleChangeComponentSelectStatus(listnerContext, opts) {
        const targetInstance = this.findEditHelperByMapUniqueKey(opts.mapUniqueKey);
        targetInstance.setSelect(opts.selected);
        this.scrollToChildren(targetInstance);
    }
    setChildRef(ref) {
        this.childInstance = ref;
    }
    render() {
        return (React.createElement("div", {className: "_namespace"}, React.createElement("div", {className: "component-count"}, "实例数:", this.props.viewport.components.size), React.createElement("div", {ref: this.setChildRef}, React.createElement(index_1.Tree, {defaultExpendAll: true, toggleByArrow: true}, React.createElement(tree_element_component_1.default, {mapUniqueKey: this.props.viewport.rootMapUniqueKey, ref: `tree-${this.props.viewport.rootMapUniqueKey}`}))), React.createElement(tree_move_box_component_1.default, null)));
    }
};
Tree.defaultProps = new typings.Props();
__decorate([
    index_2.autoBindMethod
], Tree.prototype, "addListener", null);
__decorate([
    index_2.autoBindMethod
], Tree.prototype, "handleViewportOrTreeComponentMouseOver", null);
__decorate([
    index_2.autoBindMethod
], Tree.prototype, "scrollToChildren", null);
__decorate([
    index_2.autoBindMethod
], Tree.prototype, "findEditHelperByMapUniqueKey", null);
__decorate([
    index_2.autoBindMethod
], Tree.prototype, "handleViewportOrTreeRootComponentMouseLeave", null);
__decorate([
    index_2.autoBindMethod
], Tree.prototype, "handleChangeComponentSelectStatus", null);
__decorate([
    index_2.autoBindMethod
], Tree.prototype, "setChildRef", null);
Tree = __decorate([
    mobx_react_1.inject('application', 'viewport'),
    mobx_react_1.observer
], Tree);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tree;
