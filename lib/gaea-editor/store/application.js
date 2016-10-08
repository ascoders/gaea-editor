"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const mobx_1 = require('mobx');
const _ = require('lodash');
const deep_diff_1 = require('../utils/deep-diff');
const event_1 = require('./event');
class Application {
    constructor() {
        this.event = new event_1.default();
        this.headerHeight = 37;
        this.leftSidebarWidth = 240;
        this.sidebarWidth = 240;
        this.sidebarAddonWidth = 280;
        this.footerHeight = 25;
        this.viewportWidth = 100;
        this.isSidebarMoving = false;
        this.isPreview = false;
        this.comboComponents = [];
        this.baseComponents = [];
        this.customComponents = [];
        this.isHideCustomComponents = false;
        this.title = '';
    }
    setInitPropsToApplication(props) {
        this.title = props.title;
        this.baseComponents = props.baseComponents;
        this.setCustomComponents(props.customComponents);
        this.isHideCustomComponents = props.isHideCustomComponents;
        this.defaultValue = props.defaultValue;
        this.height = props.height;
        this.isReactNative = props.isReactNative;
    }
    setCustomComponents(customComponents) {
        this.customComponents = customComponents;
    }
    addComboComponent(comboComponent) {
        comboComponent.componentInfo = this.cleanComponent(comboComponent.componentInfo);
        comboComponent.childs && Object.keys(comboComponent.childs).forEach(childMapUniqueKey => {
            comboComponent.childs[childMapUniqueKey] = this.cleanComponent(comboComponent.childs[childMapUniqueKey]);
        });
        this.comboComponents.push(comboComponent);
    }
    getComponentByUniqueKey(uniqueKey) {
        if (this.baseComponents) {
            for (let component of this.baseComponents) {
                if (component.defaultProps.gaeaUniqueKey === uniqueKey) {
                    return component;
                }
            }
        }
        for (let component of this.customComponents) {
            if (component.defaultProps.gaeaUniqueKey === uniqueKey) {
                return component;
            }
        }
        return null;
    }
    setViewportWidth(width) {
        this.viewportWidth = width;
    }
    setSidebarWidth(value) {
        if (value < 180) {
            value = 180;
        }
        if (value > 600) {
            value = 600;
        }
        this.sidebarWidth = value;
    }
    setSidebarMoving(isMoving) {
        this.isSidebarMoving = isMoving;
    }
    setPreview(isPreview) {
        this.isPreview = isPreview;
    }
    cleanComponent(componentInfo) {
        const planComponentInfo = JSON.parse(JSON.stringify(componentInfo));
        const defaultProps = _.cloneDeep(this.getComponentByUniqueKey(planComponentInfo.props.gaeaUniqueKey).defaultProps);
        const deepDiffProps = deep_diff_1.default(planComponentInfo.props, defaultProps);
        deepDiffProps.gaeaUniqueKey = planComponentInfo.props.gaeaUniqueKey;
        planComponentInfo.props = deepDiffProps;
        if (planComponentInfo.layoutChilds && planComponentInfo.layoutChilds.length === 0) {
            delete planComponentInfo.layoutChilds;
        }
        if (!planComponentInfo.props || Object.keys(planComponentInfo.props).length === 0) {
            delete planComponentInfo.props;
        }
        delete planComponentInfo.props.gaeaEdit;
        delete planComponentInfo.props.gaeaIcon;
        return JSON.parse(JSON.stringify(planComponentInfo));
    }
    expendComponent(componentInfo) {
        const planComponentInfo = _.toPlainObject(componentInfo);
        const defaultProps = _.cloneDeep(this.getComponentByUniqueKey(planComponentInfo.props.gaeaUniqueKey).defaultProps);
        planComponentInfo.props = _.merge(defaultProps, planComponentInfo.props);
        return planComponentInfo;
    }
}
__decorate([
    mobx_1.observable
], Application.prototype, "headerHeight", void 0);
__decorate([
    mobx_1.observable
], Application.prototype, "leftSidebarWidth", void 0);
__decorate([
    mobx_1.observable
], Application.prototype, "sidebarWidth", void 0);
__decorate([
    mobx_1.observable
], Application.prototype, "sidebarAddonWidth", void 0);
__decorate([
    mobx_1.observable
], Application.prototype, "footerHeight", void 0);
__decorate([
    mobx_1.observable
], Application.prototype, "viewportWidth", void 0);
__decorate([
    mobx_1.observable
], Application.prototype, "isSidebarMoving", void 0);
__decorate([
    mobx_1.observable
], Application.prototype, "isPreview", void 0);
__decorate([
    mobx_1.observable
], Application.prototype, "comboComponents", void 0);
__decorate([
    mobx_1.action('初始化配置')
], Application.prototype, "setInitPropsToApplication", null);
__decorate([
    mobx_1.action('设置定制组件')
], Application.prototype, "setCustomComponents", null);
__decorate([
    mobx_1.action('添加一个组合')
], Application.prototype, "addComboComponent", null);
__decorate([
    mobx_1.action('根据 uniqueKey 获取组件 Class')
], Application.prototype, "getComponentByUniqueKey", null);
__decorate([
    mobx_1.action('设置视图区域宽度')
], Application.prototype, "setViewportWidth", null);
__decorate([
    mobx_1.action('设置侧边栏宽度')
], Application.prototype, "setSidebarWidth", null);
__decorate([
    mobx_1.action('设置侧边栏是否在移动状态')
], Application.prototype, "setSidebarMoving", null);
__decorate([
    mobx_1.action('修改预览状态')
], Application.prototype, "setPreview", null);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Application;
