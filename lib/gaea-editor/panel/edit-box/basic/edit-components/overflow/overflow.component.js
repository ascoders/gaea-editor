"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const typings = require('./overflow.type');
const mobx_react_1 = require('mobx-react');
const index_1 = require('../../../../../../../../web-common/button/index');
const index_2 = require('../../../../../../../../web-common/tooltip/index');
require('./overflow.scss');
let EditComponentOverflow = class EditComponentOverflow extends React.Component {
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
    isOverflowXYEqual() {
        return this.componentInfo.props.style.overflowX === this.componentInfo.props.style.overflowY || (this.componentInfo.props.style.overflowX === null || this.componentInfo.props.style.overflowX === 'auto') && (this.componentInfo.props.style.overflowY === null || this.componentInfo.props.style.overflowY === 'auto');
    }
    init(props) {
        if (this.isOverflowXYEqual()) {
            this.setState({
                expand: false
            });
        }
        else {
            this.setState({
                expand: true
            });
        }
    }
    isStatu(statu) {
        const style = this.componentInfo.props.style;
        if ((style.overflow === null || style.overflow === 'auto') && (style.overflowX === null || style.overflowX === 'auto') && (style.overflowY === null || style.overflowY === 'auto')) {
            return statu === 'auto';
        }
        return (style.overflow === statu && style.overflowX === null && style.overflowY === null) || style.overflow === null && style.overflowX === statu && style.overflowY === statu;
    }
    handleUpdateCompressValue(field, value) {
        this.props.viewport.prepareWriteHistory();
        this.props.viewport.updateComponentValueWithNoHistory(field, value);
        this.props.viewport.updateComponentValueWithNoHistory('style.overflowX', null);
        this.props.viewport.updateComponentValueWithNoHistory('style.overflowY', null);
        this.props.viewport.writeHistory();
    }
    handleUpdateExpandValue(field, value) {
        this.props.viewport.prepareWriteHistory();
        this.props.viewport.updateComponentValueWithNoHistory(field, value);
        this.props.viewport.updateComponentValueWithNoHistory('style.overflow', null);
        this.props.viewport.writeHistory();
    }
    handleExpand() {
        this.setState({
            expand: true
        });
    }
    handleCompress() {
        this.setState({
            expand: false
        });
    }
    renderOverflow() {
        return (React.createElement(index_1.ButtonGroup, null, React.createElement(index_2.Tooltip, {title: "Auto"}, React.createElement(index_1.Button, {active: this.isStatu('auto'), onClick: this.handleUpdateCompressValue.bind(this, 'style.overflow', 'auto')}, "1")), React.createElement(index_2.Tooltip, {title: "Visible"}, React.createElement(index_1.Button, {active: this.isStatu('visible'), onClick: this.handleUpdateCompressValue.bind(this, 'style.overflow', 'visible')}, "2")), !this.props.application.isReactNative &&
            React.createElement(index_2.Tooltip, {title: "Scroll"}, React.createElement(index_1.Button, {active: this.isStatu('scroll'), onClick: this.handleUpdateCompressValue.bind(this, 'style.overflow', 'scroll')}, "3")), React.createElement(index_2.Tooltip, {title: "Hidden"}, React.createElement(index_1.Button, {active: this.isStatu('hidden'), onClick: this.handleUpdateCompressValue.bind(this, 'style.overflow', 'hidden')}, "4"))));
    }
    isExpandStatu(field, statu) {
        const style = this.componentInfo.props.style;
        if (style[field] === null && style['overflow'] === statu) {
            return true;
        }
        if (style[field] === null && style['overflow'] === null) {
            return statu === 'auto';
        }
        return style[field] === statu;
    }
    renderOverflowExpand() {
        return (React.createElement("div", {className: "expand-container"}, React.createElement(index_1.ButtonGroup, null, React.createElement(index_2.Tooltip, {title: "Auto"}, React.createElement(index_1.Button, {active: this.isExpandStatu('overflowX', 'auto'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'auto')}, "1")), React.createElement(index_2.Tooltip, {title: "Visible"}, React.createElement(index_1.Button, {active: this.isExpandStatu('overflowX', 'visible'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'visible')}, "2")), !this.props.application.isReactNative &&
            React.createElement(index_2.Tooltip, {title: "Scroll"}, React.createElement(index_1.Button, {active: this.isExpandStatu('overflowX', 'scroll'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'scroll')}, "3")), React.createElement(index_2.Tooltip, {title: "Hidden"}, React.createElement(index_1.Button, {active: this.isExpandStatu('overflowX', 'hidden'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'hidden')}, "4"))), React.createElement(index_1.ButtonGroup, null, React.createElement(index_2.Tooltip, {title: "Auto"}, React.createElement(index_1.Button, {active: this.isExpandStatu('overflowY', 'auto'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'auto')}, "1")), React.createElement(index_2.Tooltip, {title: "Visible"}, React.createElement(index_1.Button, {active: this.isExpandStatu('overflowY', 'visible'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'visible')}, "2")), !this.props.application.isReactNative &&
            React.createElement(index_2.Tooltip, {title: "Scroll"}, React.createElement(index_1.Button, {active: this.isExpandStatu('overflowY', 'scroll'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'scroll')}, "3")), React.createElement(index_2.Tooltip, {title: "Hidden"}, React.createElement(index_1.Button, {active: this.isExpandStatu('overflowY', 'hidden'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'hidden')}, "4")))));
    }
    render() {
        const canExpand = !this.state.expand;
        const canCompress = this.state.expand && this.isOverflowXYEqual();
        return (React.createElement("div", {className: "_namespace"}, this.state.expand ?
            React.createElement("div", {className: "overflow-expend-label-container"}, React.createElement("div", {className: "label-item"}, "OverflowX"), React.createElement("div", {className: "label-item"}, "OverflowY")) :
            React.createElement("div", null, "Overflow"), React.createElement("div", {className: "overflow-expend-button-container"}, canExpand &&
            React.createElement(index_1.Button, {onClick: this.handleExpand.bind(this)}, React.createElement("i", {className: "fa fa-expand"})), canCompress &&
            React.createElement(index_1.Button, {onClick: this.handleCompress.bind(this)}, React.createElement("i", {className: "fa fa-compress"}))), React.createElement("div", {className: "operate-container"}, this.state.expand ? this.renderOverflowExpand() : this.renderOverflow())));
    }
};
EditComponentOverflow.defaultProps = new typings.Props();
EditComponentOverflow = __decorate([
    mobx_react_1.inject('viewport', 'application'),
    mobx_react_1.observer
], EditComponentOverflow);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentOverflow;
