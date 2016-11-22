"use strict";

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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
var typings = require("./editor-attribute-width-height.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-number');
require("./editor-attribute-width-height.css");
var parseInputValue = function parseInputValue(value, unit) {
    if (value === '') {
        return null;
    } else if (unit === '') {
        return parseInt(value);
    } else {
        return value + unit;
    }
};
var EditorAttributeWidthHeight = function (_React$Component) {
    (0, _inherits3.default)(EditorAttributeWidthHeight, _React$Component);

    function EditorAttributeWidthHeight() {
        (0, _classCallCheck3.default)(this, EditorAttributeWidthHeight);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditorAttributeWidthHeight.__proto__ || Object.getPrototypeOf(EditorAttributeWidthHeight)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditorAttributeWidthHeight, [{
        key: "renderInput",
        value: function renderInput(label, field) {
            var units = this.props.ApplicationStore.editorProps.isReactNative ? null : [{
                key: '',
                value: 'px'
            }, {
                key: '%',
                value: '%'
            }];
            var currentUnit = this.props.ApplicationStore.editorProps.isReactNative ? null : _.endsWith(this.props.ViewportStore.currentEditComponentInfo.props.style[field], '%') ? '%' : '';
            return React.createElement("div", { className: "input-container" }, React.createElement("span", { className: "input-container-label" }, label), React.createElement(index_1.Number, { label: "", value: this.props.ViewportStore.currentEditComponentInfo.props.style[field] || '', placeholder: "Null", units: units, currentUnit: currentUnit, onChange: this.handleChangeValue.bind(this, field) }));
        }
    }, {
        key: "handleChangeValue",
        value: function handleChangeValue(field, value, unit) {
            this.setState((0, _defineProperty3.default)({}, field, value));
            if (this.props.ApplicationStore.editorProps.isReactNative) {
                this.props.ViewportAction.updateCurrentEditComponentProps("style." + field, parseInt(value));
            } else {
                this.props.ViewportAction.updateCurrentEditComponentProps("style." + field, parseInputValue(value, unit));
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-editor_attribute_width_height" }, React.createElement("div", { className: "line" }, React.createElement("div", { className: "container-left" }, this.renderInput('宽度', 'width')), React.createElement("div", { className: "container-right" }, this.renderInput('高度', 'height'))), React.createElement("div", { className: "line" }, React.createElement("div", { className: "container-left" }, this.renderInput('max', 'maxWidth')), React.createElement("div", { className: "container-right" }, this.renderInput('max', 'maxHeight'))), React.createElement("div", { className: "line" }, React.createElement("div", { className: "container-left" }, this.renderInput('min', 'minWidth')), React.createElement("div", { className: "container-right" }, this.renderInput('min', 'minHeight'))));
        }
    }]);
    return EditorAttributeWidthHeight;
}(React.Component);
EditorAttributeWidthHeight.defaultProps = new typings.Props();
EditorAttributeWidthHeight.position = 'editorAttributeWidthHeight';
EditorAttributeWidthHeight = __decorate([EditorManager.observer(['ViewportStore', 'ApplicationStore', 'ViewportAction'])], EditorAttributeWidthHeight);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorAttributeWidthHeight;