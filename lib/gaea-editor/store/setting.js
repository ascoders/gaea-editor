"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const mobx_1 = require('mobx');
class Setting {
    constructor() {
        this.confirmWhenRemoveComponent = true;
        this.showLayout = true;
    }
    setShowLayout(isShow) {
        this.showLayout = isShow;
    }
    setConfirmWhenRemoveComponent(isConfirm) {
        this.confirmWhenRemoveComponent = isConfirm;
    }
}
__decorate([
    mobx_1.observable
], Setting.prototype, "confirmWhenRemoveComponent", void 0);
__decorate([
    mobx_1.observable
], Setting.prototype, "showLayout", void 0);
__decorate([
    mobx_1.action('设置是否显示布局元素')
], Setting.prototype, "setShowLayout", null);
__decorate([
    mobx_1.action('设置点击编辑框移除按钮时, 是否二次确认')
], Setting.prototype, "setConfirmWhenRemoveComponent", null);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Setting;
