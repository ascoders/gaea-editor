"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const typings = require('./basic.type');
const mobx_react_1 = require('mobx-react');
const index_1 = require('../../../../../../common/auto-bind/index');
const index_2 = require('../../../../../../web-common/button/index');
const index_3 = require('../../../../../../web-common/input/index');
const remote_button_component_1 = require('./remote-button/remote-button.component');
const set_group_button_component_1 = require('./set-group-button/set-group-button.component');
const text_component_1 = require('./edit-components/text/text.component');
const select_component_1 = require('./edit-components/select/select.component');
const switch_component_1 = require('./edit-components/switch/switch.component');
const array_component_1 = require('./edit-components/array/array.component');
const margin_padding_component_1 = require('./edit-components/margin-padding/margin-padding.component');
const number_component_1 = require('./edit-components/number/number.component');
const width_height_component_1 = require('./edit-components/width-height/width-height.component');
const layout_component_1 = require('./edit-components/layout/layout.component');
const overflow_component_1 = require('./edit-components/overflow/overflow.component');
const background_component_1 = require('./edit-components/background/background.component');
require('./basic.scss');
let EditBoxBasic = class EditBoxBasic extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    resetOptions() {
        this.props.viewport.resetComponent(this.props.viewport.currentEditComponentMapUniqueKey);
    }
    handleChangeName(value) {
        this.componentInfo.props.gaeaName = value;
    }
    titleInputRightRender() {
        if (this.componentInfo.parentMapUniqueKey === null) {
            return null;
        }
        return (React.createElement(remote_button_component_1.default, null));
    }
    render() {
        if (!this.props.viewport.currentEditComponentMapUniqueKey) {
            return null;
        }
        this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
        const Editors = this.componentInfo.props.gaeaEdit && this.componentInfo.props.gaeaEdit.map((editOption, index) => {
            let key = `${this.props.viewport.currentEditComponentMapUniqueKey}-${editOption.field}-${editOption.editor}`;
            let EditElement = null;
            if (editOption.constructor.name === 'String') {
                key = `${this.props.viewport.currentEditComponentMapUniqueKey}-${editOption.toString()}`;
                return (React.createElement("div", {className: "header-title", style: { marginTop: index === 0 ? 0 : 5 }, key: key}, editOption.toString()));
            }
            switch (editOption.editor) {
                case 'text':
                    EditElement = (React.createElement(text_component_1.default, {editOption: editOption}));
                    break;
                case 'selector':
                    EditElement = (React.createElement(select_component_1.default, {editOption: editOption}));
                    break;
                case 'switch':
                    EditElement = (React.createElement(switch_component_1.default, {editOption: editOption}));
                    break;
                case 'array':
                    EditElement = (React.createElement(array_component_1.default, {editOption: editOption}));
                    break;
                case 'marginPadding':
                    EditElement = (React.createElement(margin_padding_component_1.default, {editOption: editOption}));
                    break;
                case 'number':
                    EditElement = (React.createElement(number_component_1.default, {editOption: editOption}));
                    break;
                case 'widthHeight':
                    EditElement = (React.createElement(width_height_component_1.default, {editOption: editOption}));
                    break;
                case 'layout':
                    EditElement = (React.createElement(layout_component_1.default, {editOption: editOption}));
                    break;
                case 'overflow':
                    EditElement = (React.createElement(overflow_component_1.default, {editOption: editOption}));
                    break;
                case 'background':
                    EditElement = (React.createElement(background_component_1.default, {editOption: editOption}));
                    break;
            }
            return (React.createElement("div", {key: key, className: "edit-line-container"}, editOption.label !== '' &&
                React.createElement("div", {className: "edit-line-label"}, editOption.label), React.createElement("div", {className: "edit-line-editor"}, EditElement)));
        });
        let ResetButton = null;
        if (this.componentInfo.parentMapUniqueKey !== null) {
            ResetButton = (React.createElement(index_2.Button, {onClick: this.resetOptions}, "重置"));
        }
        let GroupButton = null;
        if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.parentMapUniqueKey !== null) {
            GroupButton = (React.createElement(set_group_button_component_1.default, null));
        }
        return (React.createElement("div", {className: "_namespace"}, React.createElement("div", {className: "basic-title-container"}, React.createElement("div", {className: "component-icon-container"}, React.createElement("i", {className: `fa fa-${this.componentInfo.props.gaeaIcon}`})), React.createElement(index_3.default, {className: "title-name", label: "", key: this.props.viewport.currentEditComponentMapUniqueKey, onChange: this.handleChangeName, rightRender: this.titleInputRightRender, value: this.componentInfo.props.gaeaName})), React.createElement("div", {className: "edit-item-container"}, Editors), React.createElement("div", {className: "bottom-addon"}, React.createElement(index_2.ButtonGroup, null, ResetButton, GroupButton))));
    }
};
EditBoxBasic.defaultProps = new typings.Props();
__decorate([
    index_1.autoBindMethod
], EditBoxBasic.prototype, "resetOptions", null);
__decorate([
    index_1.autoBindMethod
], EditBoxBasic.prototype, "handleChangeName", null);
__decorate([
    index_1.autoBindMethod
], EditBoxBasic.prototype, "titleInputRightRender", null);
EditBoxBasic = __decorate([
    mobx_react_1.inject('viewport', 'application'),
    mobx_react_1.observer
], EditBoxBasic);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditBoxBasic;
