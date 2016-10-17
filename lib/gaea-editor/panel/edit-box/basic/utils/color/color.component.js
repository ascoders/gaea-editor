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
var typings = require("./color.type");
var mobx_react_1 = require("mobx-react");
var react_color_1 = require("react-color");
var index_1 = require("../../../../../../../../common/auto-bind/index");
require("./color.css");
var Color = function (_React$Component) {
    _inherits(Color, _React$Component);

    function Color() {
        _classCallCheck(this, Color);

        var _this = _possibleConstructorReturn(this, (Color.__proto__ || Object.getPrototypeOf(Color)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(Color, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.props.application.event.on(this.props.application.event.editorPanelShadowClose, this.handleEditorPanelShadowClose);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.props.application.event.off(this.props.application.event.editorPanelShadowClose, this.handleEditorPanelShadowClose);
        }
    }, {
        key: "handleEditorPanelShadowClose",
        value: function handleEditorPanelShadowClose() {
            this.handleClose();
        }
    }, {
        key: "handleColorPickerClick",
        value: function handleColorPickerClick() {
            var _this2 = this;

            this.setState({
                displayColorPicker: true
            }, function () {
                _this2.props.viewport.setShowEditorPanelShadow(true);
            });
        }
    }, {
        key: "handleClose",
        value: function handleClose() {
            this.setState({
                displayColorPicker: false
            });
        }
    }, {
        key: "handleColorChange",
        value: function handleColorChange(color) {
            this.props.onChange(color);
        }
    }, {
        key: "handleColorChangeComplete",
        value: function handleColorChangeComplete(color) {
            this.props.onChangeComplete(color);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-utils-color" }, React.createElement("div", { className: "color-picker-label-container", onClick: this.handleColorPickerClick.bind(this) }, React.createElement("div", { className: "color-picker-label", style: { backgroundColor: this.props.color } })), this.state.displayColorPicker && React.createElement("div", { className: "picker-container", style: this.props.absoluteStyle }, React.createElement(react_color_1.ChromePicker, { label: "hex", onChange: this.handleColorChange.bind(this), onChangeComplete: this.handleColorChangeComplete.bind(this), color: this.props.color })));
        }
    }]);

    return Color;
}(React.Component);
Color.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], Color.prototype, "handleEditorPanelShadowClose", null);
Color = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], Color);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Color;