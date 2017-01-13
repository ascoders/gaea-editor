"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

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
var gaea_editor_manager_1 = require("../../../gaea-editor-manager/gaea-editor-manager");
var LZString = require("lz-string");

var GlobalSettingAction = function () {
    function GlobalSettingAction() {
        (0, _classCallCheck3.default)(this, GlobalSettingAction);

        this.observableClass = true;
    }

    (0, _createClass3.default)(GlobalSettingAction, [{
        key: "getZipSettingData",
        value: function getZipSettingData() {
            return LZString.compressToBase64(JSON.stringify(this.globalSetting));
        }
    }, {
        key: "setDefaultSetting",
        value: function setDefaultSetting(setting) {
            if (setting !== null && setting !== undefined && setting !== '') {
                this.globalSetting = gaea_editor_manager_1.extendObservable(this.globalSetting || {}, JSON.parse(LZString.decompressFromBase64(setting)));
            }
        }
    }, {
        key: "setShowLayout",
        value: function setShowLayout(isShow) {
            this.globalSetting.showLayout = isShow;
        }
    }, {
        key: "setConfirmWhenRemoveComponent",
        value: function setConfirmWhenRemoveComponent(isConfirm) {
            this.globalSetting.confirmWhenRemoveComponent = isConfirm;
        }
    }, {
        key: "setBackgroundColor",
        value: function setBackgroundColor(color, opacity) {
            if (opacity === 0) {
                this.applicationAction.setViewportContainerStyle({
                    backgroundColor: "transparent"
                });
                this.globalSetting.backgroundColor = "transparent";
            } else {
                this.applicationAction.setViewportContainerStyle({
                    backgroundColor: color
                });
                this.globalSetting.backgroundColor = color;
            }
        }
    }, {
        key: "setViewportSize",
        value: function setViewportSize(width, height) {
            this.globalSetting.viewportWidth = width;
            this.globalSetting.viewportHeight = height;
            if (this.globalSetting.fitInWeb === 'mobile') {
                this.applicationAction.setViewportStyle({
                    width: this.globalSetting.viewportWidth,
                    height: this.globalSetting.viewportHeight
                });
            }
        }
    }, {
        key: "changeFitInWeb",
        value: function changeFitInWeb(type) {
            this.globalSetting.fitInWeb = type;
            if (type === 'pc') {
                this.applicationAction.setViewportStyle({
                    width: null,
                    height: null,
                    flexGrow: 1
                });
            } else {
                this.applicationAction.setViewportStyle({
                    flexGrow: null,
                    width: this.globalSetting.viewportWidth,
                    height: this.globalSetting.viewportHeight
                });
            }
        }
    }, {
        key: "changeShowTimeUnlimited",
        value: function changeShowTimeUnlimited() {
            this.globalSetting.showTimeStart = null;
            this.globalSetting.showTimeEnd = null;
        }
    }, {
        key: "changeShowTimeLimited",
        value: function changeShowTimeLimited() {
            this.globalSetting.showTimeStart = new Date().toString();
            var currentDate = new Date();
            this.globalSetting.showTimeEnd = new Date((currentDate.getTime() / 1000 + 86400) * 1000).toString();
        }
    }, {
        key: "changeShowTime",
        value: function changeShowTime(startOrEnd, dateOrTime, value) {
            if (startOrEnd === 'start') {
                if (dateOrTime === 'date') {
                    this.globalSetting.showTimeStartDate = value;
                    this.globalSetting.showTimeStart = this.globalSetting.showTimeStartDate + ' ' + this.globalSetting.showTimeStartTime;
                } else {
                    this.globalSetting.showTimeStartTime = value;
                    if (this.globalSetting.showTimeStartDate !== '') {
                        this.globalSetting.showTimeStart = this.globalSetting.showTimeStartDate + ' ' + this.globalSetting.showTimeStartTime;
                    }
                }
            } else {
                if (dateOrTime === 'date') {
                    this.globalSetting.showTimeEndDate = value;
                    this.globalSetting.showTimeEnd = this.globalSetting.showTimeEndDate + ' ' + this.globalSetting.showTimeEndTime;
                } else {
                    this.globalSetting.showTimeEndTime = value;
                    if (this.globalSetting.showTimeEndDate !== '') {
                        this.globalSetting.showTimeEnd = this.globalSetting.showTimeEndDate + ' ' + this.globalSetting.showTimeEndTime;
                    }
                }
            }
        }
    }]);
    return GlobalSettingAction;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GlobalSettingAction;
__decorate([gaea_editor_manager_1.inject('GlobalSettingStore')], GlobalSettingAction.prototype, "globalSetting", void 0);
__decorate([gaea_editor_manager_1.inject('ApplicationAction')], GlobalSettingAction.prototype, "applicationAction", void 0);
__decorate([gaea_editor_manager_1.observable], GlobalSettingAction.prototype, "observableClass", void 0);
__decorate([gaea_editor_manager_1.action('获取压缩的配置信息')], GlobalSettingAction.prototype, "getZipSettingData", null);
__decorate([gaea_editor_manager_1.action('覆盖默认配置信息')], GlobalSettingAction.prototype, "setDefaultSetting", null);
__decorate([gaea_editor_manager_1.action('设置是否显示布局元素')], GlobalSettingAction.prototype, "setShowLayout", null);
__decorate([gaea_editor_manager_1.action('设置点击编辑框移除按钮时, 是否二次确认')], GlobalSettingAction.prototype, "setConfirmWhenRemoveComponent", null);
__decorate([gaea_editor_manager_1.action('设置画布背景颜色')], GlobalSettingAction.prototype, "setBackgroundColor", null);
__decorate([gaea_editor_manager_1.action('设置视图区域宽度')], GlobalSettingAction.prototype, "setViewportSize", null);
__decorate([gaea_editor_manager_1.action('修改网页适配')], GlobalSettingAction.prototype, "changeFitInWeb", null);
__decorate([gaea_editor_manager_1.action('设置显示时间段为无限制')], GlobalSettingAction.prototype, "changeShowTimeUnlimited", null);
__decorate([gaea_editor_manager_1.action('设置显示时间段为限制')], GlobalSettingAction.prototype, "changeShowTimeLimited", null);
__decorate([gaea_editor_manager_1.action('设置时间段')], GlobalSettingAction.prototype, "changeShowTime", null);