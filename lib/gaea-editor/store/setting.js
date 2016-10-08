"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var mobx_1 = require('mobx');

var Setting = function () {
    function Setting() {
        _classCallCheck(this, Setting);

        this.confirmWhenRemoveComponent = true;
        this.showLayout = true;
    }

    _createClass(Setting, [{
        key: "setShowLayout",
        value: function setShowLayout(isShow) {
            this.showLayout = isShow;
        }
    }, {
        key: "setConfirmWhenRemoveComponent",
        value: function setConfirmWhenRemoveComponent(isConfirm) {
            this.confirmWhenRemoveComponent = isConfirm;
        }
    }]);

    return Setting;
}();

__decorate([mobx_1.observable], Setting.prototype, "confirmWhenRemoveComponent", void 0);
__decorate([mobx_1.observable], Setting.prototype, "showLayout", void 0);
__decorate([mobx_1.action('设置是否显示布局元素')], Setting.prototype, "setShowLayout", null);
__decorate([mobx_1.action('设置点击编辑框移除按钮时, 是否二次确认')], Setting.prototype, "setConfirmWhenRemoveComponent", null);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Setting;