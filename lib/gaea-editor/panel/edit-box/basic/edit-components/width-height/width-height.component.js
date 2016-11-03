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
var typings = require("./width-height.type");
var mobx_react_1 = require("mobx-react");
var _ = require("lodash");
var index_1 = require('nt-web-number');
require("./width-height.css");
var parseInputValue = function parseInputValue(value, unit) {
    if (value === '') {
        return null;
    } else if (unit === '') {
        return parseInt(value);
    } else {
        return value + unit;
    }
};
var EditComponentWidthHeight = function (_React$Component) {
    (0, _inherits3.default)(EditComponentWidthHeight, _React$Component);

    function EditComponentWidthHeight() {
        (0, _classCallCheck3.default)(this, EditComponentWidthHeight);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditComponentWidthHeight.__proto__ || Object.getPrototypeOf(EditComponentWidthHeight)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditComponentWidthHeight, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
        }
    }, {
        key: "renderInput",
        value: function renderInput(label, field) {
            var units = this.props.application.isReactNative ? null : [{
                key: '',
                value: 'px'
            }, {
                key: '%',
                value: '%'
            }];
            var currentUnit = this.props.application.isReactNative ? null : _.endsWith(this.componentInfo.props.style[field], '%') ? '%' : '';
            return React.createElement("div", { className: "input-container" }, React.createElement("span", { className: "input-container-label" }, label), React.createElement(index_1.Number, { label: "", value: this.componentInfo.props.style[field] || '', placeholder: "Null", units: units, currentUnit: currentUnit, onChange: this.handleChangeValue.bind(this, field) }));
        }
    }, {
        key: "handleChangeValue",
        value: function handleChangeValue(field, value, unit) {
            this.setState((0, _defineProperty3.default)({}, field, value));
            if (this.props.application.isReactNative) {
                this.props.viewport.updateComponentValue("style." + field, parseInt(value));
            } else {
                this.props.viewport.updateComponentValue("style." + field, parseInputValue(value, unit));
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-edit_components-width_height" }, React.createElement("div", { className: "line" }, React.createElement("div", { className: "container-left" }, this.renderInput('宽度', 'width')), React.createElement("div", { className: "container-right" }, this.renderInput('高度', 'height'))), React.createElement("div", { className: "line" }, React.createElement("div", { className: "container-left" }, this.renderInput('max', 'maxWidth')), React.createElement("div", { className: "container-right" }, this.renderInput('max', 'maxHeight'))), React.createElement("div", { className: "line" }, React.createElement("div", { className: "container-left" }, this.renderInput('min', 'minWidth')), React.createElement("div", { className: "container-right" }, this.renderInput('min', 'minHeight'))));
        }
    }]);
    return EditComponentWidthHeight;
}(React.Component);
EditComponentWidthHeight.defaultProps = new typings.Props();
EditComponentWidthHeight = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], EditComponentWidthHeight);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentWidthHeight;