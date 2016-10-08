"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const ReactDOM = require('react-dom');
const typings = require('./tree-element.type');
const mobx_react_1 = require('mobx-react');
const classNames = require('classnames');
const index_1 = require('../../../../../../web-common/tree/index');
const index_2 = require('../../../../../../common/auto-bind/index');
require('./tree-element.scss');
let TreeElement_1;
let TreeElement = TreeElement_1 = class TreeElement extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    componentWillMount() {
        this.componentInfo = this.props.viewport.components.get(this.props.mapUniqueKey);
    }
    componentDidMount() {
        this.childDomInstance = ReactDOM.findDOMNode(this.childInstance);
    }
    getDomInstance() {
        return this.childDomInstance;
    }
    treeNameRender() {
        if (this.componentInfo.props.gaeaUniqueKey.indexOf('gaea') > -1) {
            return (React.createElement("div", {className: "flex"}, React.createElement("i", {className: `fa fa-${this.componentInfo.props.gaeaIcon} icons gaea`}), React.createElement("span", {className: "text"}, this.componentInfo.props.gaeaName)));
        }
        else {
            return (React.createElement("div", {className: "flex"}, React.createElement("i", {className: `fa fa-${this.componentInfo.props.gaeaIcon} icons`}), React.createElement("span", {className: "text"}, this.componentInfo.props.gaeaName)));
        }
    }
    handleMouseOver(event) {
        event.stopPropagation();
        this.props.application.event.emit(this.props.application.event.viewportOrTreeComponentMouseOver, {
            mapUniqueKey: this.props.mapUniqueKey,
            type: 'tree'
        });
        this.props.viewport.setHoveringComponentMapUniqueKey(this.props.mapUniqueKey);
    }
    handleMouseLeave(event) {
        event.stopPropagation();
        this.props.application.event.emit(this.props.application.event.viewportOrTreeRootComponentMouseLeave, {
            mapUniqueKey: this.props.mapUniqueKey,
            type: 'tree'
        });
        this.props.viewport.setHoveringComponentMapUniqueKey(null);
    }
    outerMoveBoxToSelf() {
        this.props.viewport.setHoverTreeComponent(this.childDomInstance);
    }
    handleClick() {
        event.stopPropagation();
        this.props.viewport.setCurrentEditComponentMapUniqueKey(this.props.mapUniqueKey);
        if (this.props.viewport.lastSelectMapUniqueKey !== null) {
            this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
                mapUniqueKey: this.props.viewport.lastSelectMapUniqueKey,
                selected: false
            });
        }
        this.props.viewport.setLastSelectMapUniqueKey(this.props.mapUniqueKey);
        this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
            mapUniqueKey: this.props.mapUniqueKey,
            selected: true
        });
    }
    setSelect(selected) {
        this.setState({
            selected: selected
        });
    }
    render() {
        let resultElement;
        let childs = null;
        if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.layoutChilds) {
            childs = this.componentInfo.layoutChilds.map(layoutChildUniqueMapKey => {
                return (React.createElement(TreeElement_1.ObserveTreeElement, {key: layoutChildUniqueMapKey, mapUniqueKey: layoutChildUniqueMapKey, ref: `tree-${layoutChildUniqueMapKey}`}));
            });
        }
        let childProps = {
            render: this.treeNameRender,
            defaultExpendAll: true,
            toggleByArrow: true,
            onMouseOver: this.handleMouseOver,
            onClick: this.handleClick,
            ref: (ref) => {
                this.childInstance = ref;
            },
            className: classNames({
                '_namespace': true,
                'selected': this.state.selected
            }),
            onMouseLeave: this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' ? this.handleMouseLeave : null,
            name: this.componentInfo.props.name,
            icon: this.componentInfo.props.icon
        };
        resultElement = React.createElement(index_1.TreeNode, childProps, childs);
        return resultElement;
    }
};
TreeElement.defaultProps = new typings.Props();
TreeElement.ObserveTreeElement = mobx_react_1.inject('application', 'viewport')(mobx_react_1.observer(TreeElement));
__decorate([
    index_2.autoBindMethod
], TreeElement.prototype, "treeNameRender", null);
__decorate([
    index_2.autoBindMethod
], TreeElement.prototype, "handleMouseOver", null);
__decorate([
    index_2.autoBindMethod
], TreeElement.prototype, "handleMouseLeave", null);
__decorate([
    index_2.autoBindMethod
], TreeElement.prototype, "outerMoveBoxToSelf", null);
__decorate([
    index_2.autoBindMethod
], TreeElement.prototype, "handleClick", null);
__decorate([
    index_2.autoBindMethod
], TreeElement.prototype, "setSelect", null);
TreeElement = TreeElement_1 = __decorate([
    mobx_react_1.inject('viewport', 'application'),
    mobx_react_1.observer
], TreeElement);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TreeElement;
