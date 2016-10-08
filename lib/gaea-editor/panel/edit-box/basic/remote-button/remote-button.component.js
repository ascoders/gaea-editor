"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const React = require('react');
const typings = require('./remote-button.type');
const mobx_react_1 = require('mobx-react');
const _ = require('lodash');
const index_1 = require('../../../../../../../web-common/button/index');
const index_2 = require('../../../../../../../web-common/modal/index');
const index_3 = require('../../../../../../../common/auto-bind/index');
let RemoveButton = class RemoveButton extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = new typings.State();
    }
    handleShowModalOrClick() {
        if (this.props.setting.confirmWhenRemoveComponent) {
            this.setState({
                show: true
            });
        }
        else {
            this.handleOk();
        }
    }
    handleOk() {
        const currentEditComponentMapUniqueKey = this.props.viewport.currentEditComponentMapUniqueKey;
        const parentMapUniqueKey = this.props.viewport.components.get(currentEditComponentMapUniqueKey).parentMapUniqueKey;
        const componentInfo = _.cloneDeep(JSON.parse(JSON.stringify(this.props.viewport.components.get(currentEditComponentMapUniqueKey))));
        const index = this.props.viewport.components.get(parentMapUniqueKey).layoutChilds.findIndex(item => item === currentEditComponentMapUniqueKey);
        this.props.viewport.cancelEditComponent();
        const deleteChildsComponents = this.props.viewport.deleteComponent(currentEditComponentMapUniqueKey);
        this.props.viewport.saveOperate({
            type: 'remove',
            mapUniqueKey: currentEditComponentMapUniqueKey,
            remove: {
                mapUniqueKey: currentEditComponentMapUniqueKey,
                parentMapUniqueKey: parentMapUniqueKey,
                index: index,
                componentInfo: componentInfo,
                childs: deleteChildsComponents
            }
        });
    }
    handleCancel() {
        this.setState({
            show: false
        });
    }
    render() {
        return (React.createElement(index_1.default, {type: "secondary", onClick: this.handleShowModalOrClick}, "移除", React.createElement(index_2.default, {show: this.state.show, onOk: this.handleOk, onCancel: this.handleCancel}, React.createElement("p", null, "是否要移除此组件?"))));
    }
};
RemoveButton.defaultProps = new typings.Props();
__decorate([
    index_3.autoBindMethod
], RemoveButton.prototype, "handleShowModalOrClick", null);
__decorate([
    index_3.autoBindMethod
], RemoveButton.prototype, "handleOk", null);
__decorate([
    index_3.autoBindMethod
], RemoveButton.prototype, "handleCancel", null);
RemoveButton = __decorate([
    mobx_react_1.inject('viewport', 'setting'),
    mobx_react_1.observer
], RemoveButton);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RemoveButton;
