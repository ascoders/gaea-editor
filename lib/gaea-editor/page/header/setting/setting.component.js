"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
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
    _inherits(Setting, _React$Component);

    function Setting() {
        _classCallCheck(this, Setting);

        var _this = _possibleConstructorReturn(this, (Setting.__proto__ || Object.getPrototypeOf(Setting)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(Setting, [{
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
        key: "handleClickShadow",
        value: function handleClickShadow() {
            this.props.application.event.emit(this.props.application.event.settingShadowClose);
            this.props.viewport.setShowSettingShadow(false);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "menu-item", onClick: this.handleShowModal }, "设置", React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-header-setting" }, React.createElement(index_1.default, { className: "nt-editor-gaea-editor-gaea_editor-page-header-setting", show: this.state.show, onOk: this.handleOk.bind(this), onCancel: this.handleCancel.bind(this) }, this.props.viewport.showSettingShadow && React.createElement("div", { className: "close-modal", onClick: this.handleClickShadow }), React.createElement("div", { className: "title" }, "设置"), React.createElement("div", { className: "left-right" }, React.createElement("div", { className: "left" }, "点击移除时会弹出确认框"), React.createElement("div", { className: "right" }, React.createElement(index_2.default, { checked: this.props.setting.data.confirmWhenRemoveComponent, onChange: this.setConfirmWhenRemoveComponent }))), React.createElement("div", { className: "left-right" }, React.createElement("div", { className: "left" }, "拖动时显示所有布局元素"), React.createElement("div", { className: "right" }, React.createElement(index_2.default, { checked: this.props.setting.data.showLayout, onChange: this.setShowLayout }))), React.createElement("div", { className: "left-right" }, React.createElement("div", { className: "left" }, "画布背景颜色"), React.createElement("div", { className: "right" }, React.createElement(color_component_1.default, { color: this.props.setting.data.backgroundColor, absoluteStyle: { left: -200, zIndex: 1070 }, viewport: this.props.viewport, application: this.props.application, onChange: this.handleBackgroundColorChange, onChangeComplete: this.handleBackgroundColorChangeComplete }))))));
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
__decorate([index_3.autoBindMethod], Setting.prototype, "handleClickShadow", null);
Setting = __decorate([mobx_react_1.inject('setting', 'application', 'viewport'), mobx_react_1.observer], Setting);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Setting;