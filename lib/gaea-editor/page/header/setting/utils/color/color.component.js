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
var typings = require("./color.type");
var mobx_react_1 = require("mobx-react");
var react_color_1 = require("react-color");
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-tooltip');
require("./color.css");
var Color = function (_React$Component) {
    (0, _inherits3.default)(Color, _React$Component);

    function Color() {
        (0, _classCallCheck3.default)(this, Color);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Color.__proto__ || Object.getPrototypeOf(Color)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Color, [{
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
        key: "titleRender",
        value: function titleRender() {
            return React.createElement(react_color_1.ChromePicker, { label: "hex", onChange: this.handleColorChange.bind(this), onChangeComplete: this.handleColorChangeComplete.bind(this), color: this.props.color });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-header-setting-utils-color" }, React.createElement(index_2.default, { type: "click", showShadow: true, titleRender: this.titleRender, simple: true }, React.createElement("div", { className: "color-picker-label-container" }, React.createElement("div", { className: "color-picker-label", style: { backgroundColor: this.props.color } }))));
        }
    }]);
    return Color;
}(React.Component);
Color.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], Color.prototype, "titleRender", null);
Color = __decorate([mobx_react_1.observer], Color);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Color;