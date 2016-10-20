"use strict";

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var mobx_1 = require("mobx");
var LZString = require("lz-string");

var SettingStore = function SettingStore() {
    (0, _classCallCheck3.default)(this, SettingStore);

    this.confirmWhenRemoveComponent = true;
    this.showLayout = true;
    this.backgroundColor = 'transparent';
    this.viewportWidth = 100;
};

exports.SettingStore = SettingStore;
__decorate([mobx_1.observable], SettingStore.prototype, "confirmWhenRemoveComponent", void 0);
__decorate([mobx_1.observable], SettingStore.prototype, "showLayout", void 0);
__decorate([mobx_1.observable], SettingStore.prototype, "backgroundColor", void 0);
__decorate([mobx_1.observable], SettingStore.prototype, "viewportWidth", void 0);

var Setting = function () {
    function Setting() {
        (0, _classCallCheck3.default)(this, Setting);

        this.data = new SettingStore();
    }

    (0, _createClass3.default)(Setting, [{
        key: "getZipSettingData",
        value: function getZipSettingData() {
            return LZString.compressToBase64(JSON.stringify(this.data));
        }
    }, {
        key: "setDefaultSetting",
        value: function setDefaultSetting(setting) {
            if (setting !== null && setting !== undefined && setting !== '') {
                this.data = mobx_1.extendObservable(this.data || {}, JSON.parse(LZString.decompressFromBase64(setting)));
            }
        }
    }, {
        key: "setShowLayout",
        value: function setShowLayout(isShow) {
            this.data.showLayout = isShow;
        }
    }, {
        key: "setConfirmWhenRemoveComponent",
        value: function setConfirmWhenRemoveComponent(isConfirm) {
            this.data.confirmWhenRemoveComponent = isConfirm;
        }
    }, {
        key: "setBackgroundColor",
        value: function setBackgroundColor(color, opacity) {
            if (opacity === 0) {
                this.data.backgroundColor = 'transparent';
            } else {
                this.data.backgroundColor = color;
            }
        }
    }, {
        key: "setViewportWidth",
        value: function setViewportWidth(width) {
            this.data.viewportWidth = width;
        }
    }]);
    return Setting;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Setting;
__decorate([mobx_1.action('获取压缩的配置信息')], Setting.prototype, "getZipSettingData", null);
__decorate([mobx_1.action('覆盖默认配置信息')], Setting.prototype, "setDefaultSetting", null);
__decorate([mobx_1.action('设置是否显示布局元素')], Setting.prototype, "setShowLayout", null);
__decorate([mobx_1.action('设置点击编辑框移除按钮时, 是否二次确认')], Setting.prototype, "setConfirmWhenRemoveComponent", null);
__decorate([mobx_1.action('设置画布背景颜色')], Setting.prototype, "setBackgroundColor", null);
__decorate([mobx_1.action('设置视图区域宽度')], Setting.prototype, "setViewportWidth", null);