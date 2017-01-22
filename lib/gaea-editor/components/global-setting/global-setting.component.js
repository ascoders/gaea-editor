"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

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
var React = require("react");
var typings = require("./global-setting.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-modal');
var color_component_1 = require("../../utils/color/color.component");
var index_3 = require('nt-web-radio');
var index_4 = require('nt-web-input');
var action_1 = require("./action");
var store_1 = require("./store");
require("./global-setting.css");
function getMonthMM(month) {
    month += 1;
    return fixBefore(month);
}
function fixBefore(count) {
    if (count < 10) {
        return '0' + count.toString();
    }
    return count.toString();
}
function formatDate(date) {
    var dateObj = new Date(date);
    if (date === null) {
        return '';
    }
    return dateObj.getFullYear() + '-' + getMonthMM(dateObj.getMonth()) + '-' + fixBefore(dateObj.getDate());
}
function formatTime(date) {
    var dateObj = new Date(date);
    if (date === null) {
        return '';
    }
    return fixBefore(dateObj.getHours()) + ':' + fixBefore(dateObj.getMinutes()) + ':' + fixBefore(dateObj.getSeconds());
}
var GlobalSetting = function (_React$Component) {
    (0, _inherits3.default)(GlobalSetting, _React$Component);

    function GlobalSetting() {
        (0, _classCallCheck3.default)(this, GlobalSetting);

        var _this = (0, _possibleConstructorReturn3.default)(this, (GlobalSetting.__proto__ || Object.getPrototypeOf(GlobalSetting)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(GlobalSetting, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.props.GlobalSettingAction.setDefaultSetting(this.props.ApplicationStore.editorProps.defaultSetting);
            if (this.props.GlobalSettingStore.backgroundColor === 'transparent') {
                this.props.GlobalSettingAction.setBackgroundColor(this.props.GlobalSettingStore.backgroundColor, 0);
            } else {
                var match = /rgba\((.*)\)/g.exec(this.props.GlobalSettingStore.backgroundColor);
                var rgbaSplit = match[1].split(',');
                this.props.GlobalSettingAction.setBackgroundColor(this.props.GlobalSettingStore.backgroundColor, Number(rgbaSplit[3]));
            }
        }
    }, {
        key: "handleShowModal",
        value: function handleShowModal() {
            this.setState({
                show: true
            });
        }
    }, {
        key: "handleOk",
        value: function handleOk() {
            this.setState({
                show: false
            });
        }
    }, {
        key: "handleCancel",
        value: function handleCancel() {
            this.setState({
                show: false
            });
        }
    }, {
        key: "handleBackgroundColorChange",
        value: function handleBackgroundColorChange(color) {
            this.props.GlobalSettingAction.setBackgroundColor("rgba(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ", " + color.rgb.a + ")", color.rgb.a);
        }
    }, {
        key: "handleSwitchShowTimeUnlimited",
        value: function handleSwitchShowTimeUnlimited() {
            this.props.GlobalSettingAction.changeShowTimeUnlimited();
        }
    }, {
        key: "handleSwitchShowTimeLimited",
        value: function handleSwitchShowTimeLimited() {
            this.props.GlobalSettingAction.changeShowTimeLimited();
        }
    }, {
        key: "handleChangeStartDate",
        value: function handleChangeStartDate(event) {
            this.props.GlobalSettingAction.changeShowTime('start', 'date', event.target.value);
        }
    }, {
        key: "handleChangeStartTime",
        value: function handleChangeStartTime(event) {
            this.props.GlobalSettingAction.changeShowTime('start', 'time', event.target.value);
        }
    }, {
        key: "handleChangeEndDate",
        value: function handleChangeEndDate(event) {
            this.props.GlobalSettingAction.changeShowTime('end', 'date', event.target.value);
        }
    }, {
        key: "handleChangeEndTime",
        value: function handleChangeEndTime(event) {
            this.props.GlobalSettingAction.changeShowTime('end', 'time', event.target.value);
        }
    }, {
        key: "handleChangeCustomSetting",
        value: function handleChangeCustomSetting(key, value) {
            this.props.GlobalSettingAction.changeCustomSetting(key, value);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var TextSettings = Object.keys(this.props.GlobalSettingStore).map(function (settingKey, index) {
                if (typeof _this2.props.GlobalSettingStore[settingKey] !== 'string' && _this2.props.GlobalSettingStore[settingKey] !== 'number') {
                    return null;
                }
                var value = _this2.props.GlobalSettingStore[settingKey] ? _this2.props.GlobalSettingStore[settingKey].toString() : '';
                return React.createElement("div", { className: "row", key: index }, React.createElement("div", { className: "col" }, settingKey), React.createElement("div", { className: "col-right" }, React.createElement(index_4.default, { value: value, label: "", style: { width: 400 }, onChange: _this2.handleChangeCustomSetting.bind(_this2, settingKey) })));
            });
            return React.createElement("div", { onClick: this.handleShowModal }, "全局设置", React.createElement(index_2.Modal, { title: "全局设置", className: "nt-editor-gaea-editor-gaea_editor-components-global_setting modal", show: this.state.show, onOk: this.handleOk, size: "large", onCancel: this.handleCancel }, React.createElement("div", { className: "row" }, React.createElement("div", { className: "col" }, "画布背景颜色"), React.createElement("div", { className: "col-right" }, React.createElement(color_component_1.default, { color: this.props.GlobalSettingStore.backgroundColor || 'transparent', onChange: this.handleBackgroundColorChange }))), React.createElement("div", { className: "row" }, React.createElement("div", { className: "col" }, "展示时间段"), React.createElement("div", { className: "col-right" }, React.createElement(index_3.default, { checked: this.props.GlobalSettingStore.showTimeStart === null, onChange: this.handleSwitchShowTimeUnlimited }), "无限制", React.createElement(index_3.default, { checked: this.props.GlobalSettingStore.showTimeStart !== null, onChange: this.handleSwitchShowTimeLimited, style: { marginLeft: 10 } }), React.createElement("input", { type: "date", onChange: this.handleChangeStartDate, value: formatDate(this.props.GlobalSettingStore.showTimeStart) }), React.createElement("input", { type: "time", onChange: this.handleChangeStartTime, value: formatTime(this.props.GlobalSettingStore.showTimeStart) }), " ~ ", React.createElement("input", { type: "date", onChange: this.handleChangeEndDate, value: formatDate(this.props.GlobalSettingStore.showTimeEnd) }), React.createElement("input", { type: "time", onChange: this.handleChangeEndTime, value: formatTime(this.props.GlobalSettingStore.showTimeEnd) }))), React.createElement("div", { className: "custom-setting" }, "自定义配置"), TextSettings));
        }
    }]);
    return GlobalSetting;
}(React.Component);
GlobalSetting.defaultProps = new typings.Props();
GlobalSetting.position = 'navbarLeft';
GlobalSetting.Action = action_1.default;
GlobalSetting.Store = store_1.default;
__decorate([index_1.autoBindMethod], GlobalSetting.prototype, "handleShowModal", null);
__decorate([index_1.autoBindMethod], GlobalSetting.prototype, "handleOk", null);
__decorate([index_1.autoBindMethod], GlobalSetting.prototype, "handleCancel", null);
__decorate([index_1.autoBindMethod], GlobalSetting.prototype, "handleBackgroundColorChange", null);
__decorate([index_1.autoBindMethod], GlobalSetting.prototype, "handleSwitchShowTimeUnlimited", null);
__decorate([index_1.autoBindMethod], GlobalSetting.prototype, "handleSwitchShowTimeLimited", null);
__decorate([index_1.autoBindMethod], GlobalSetting.prototype, "handleChangeStartDate", null);
__decorate([index_1.autoBindMethod], GlobalSetting.prototype, "handleChangeStartTime", null);
__decorate([index_1.autoBindMethod], GlobalSetting.prototype, "handleChangeEndDate", null);
__decorate([index_1.autoBindMethod], GlobalSetting.prototype, "handleChangeEndTime", null);
__decorate([index_1.autoBindMethod], GlobalSetting.prototype, "handleChangeCustomSetting", null);
GlobalSetting = __decorate([EditorManager.observer(['ApplicationStore', 'GlobalSettingAction', 'GlobalSettingStore'])], GlobalSetting);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GlobalSetting;