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
var typings = require("./setting.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-modal');
var index_2 = require('nt-web-switch');
var color_component_1 = require("./utils/color/color.component");
var index_3 = require('nt-auto-bind');
require("./setting.css");
var Setting = function (_React$Component) {
    (0, _inherits3.default)(Setting, _React$Component);

    function Setting() {
        (0, _classCallCheck3.default)(this, Setting);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Setting.__proto__ || Object.getPrototypeOf(Setting)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Setting, [{
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
        key: "setConfirmWhenRemoveComponent",
        value: function setConfirmWhenRemoveComponent(checked) {
            this.props.setting.setConfirmWhenRemoveComponent(checked);
        }
    }, {
        key: "setShowLayout",
        value: function setShowLayout(checked) {
            this.props.setting.setShowLayout(checked);
        }
    }, {
        key: "handleBackgroundColorChange",
        value: function handleBackgroundColorChange(color) {
            this.props.setting.setBackgroundColor("rgba(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ", " + color.rgb.a + ")", color.rgb.a);
        }
    }, {
        key: "handleBackgroundColorChangeComplete",
        value: function handleBackgroundColorChangeComplete(color) {}
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "menu-item", onClick: this.handleShowModal }, "设置", React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-header-setting" }, React.createElement(index_1.default, { className: "nt-editor-gaea-editor-gaea_editor-page-header-setting", title: "设置", show: this.state.show, onOk: this.handleOk.bind(this), onCancel: this.handleCancel.bind(this) }, React.createElement("div", { className: "left-right" }, React.createElement("div", { className: "left" }, "点击移除时会弹出确认框"), React.createElement("div", { className: "right" }, React.createElement(index_2.default, { checked: this.props.setting.data.confirmWhenRemoveComponent, onChange: this.setConfirmWhenRemoveComponent }))), React.createElement("div", { className: "left-right" }, React.createElement("div", { className: "left" }, "拖动时显示所有布局元素"), React.createElement("div", { className: "right" }, React.createElement(index_2.default, { checked: this.props.setting.data.showLayout, onChange: this.setShowLayout }))), React.createElement("div", { className: "left-right" }, React.createElement("div", { className: "left" }, "画布背景颜色"), React.createElement("div", { className: "right" }, React.createElement(color_component_1.default, { color: this.props.setting.data.backgroundColor, absoluteStyle: { left: -200, zIndex: 1070 }, viewport: this.props.viewport, application: this.props.application, onChange: this.handleBackgroundColorChange, onChangeComplete: this.handleBackgroundColorChangeComplete }))))));
        }
    }]);
    return Setting;
}(React.Component);
Setting.defaultProps = new typings.Props();
__decorate([index_3.autoBindMethod], Setting.prototype, "handleShowModal", null);
__decorate([index_3.autoBindMethod], Setting.prototype, "handleOk", null);
__decorate([index_3.autoBindMethod], Setting.prototype, "handleCancel", null);
__decorate([index_3.autoBindMethod], Setting.prototype, "setConfirmWhenRemoveComponent", null);
__decorate([index_3.autoBindMethod], Setting.prototype, "setShowLayout", null);
__decorate([index_3.autoBindMethod], Setting.prototype, "handleBackgroundColorChange", null);
__decorate([index_3.autoBindMethod], Setting.prototype, "handleBackgroundColorChangeComplete", null);
Setting = __decorate([mobx_react_1.inject('setting', 'application', 'viewport'), mobx_react_1.observer], Setting);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Setting;