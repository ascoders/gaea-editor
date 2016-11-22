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

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require("react");
var typings = require("./editor-attribute-number.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-number');
var index_2 = require('nt-auto-bind');
require("./editor-attribute-number.css");
var parseInputToOutRange = function parseInputToOutRange(value, inputRange, outputRange) {
    if (value >= inputRange[0] && value <= inputRange[1]) {
        var percentage = (value - inputRange[0]) / (inputRange[1] - inputRange[0]);
        var outputLength = (outputRange[1] - outputRange[0]) * percentage;
        value = outputLength + outputRange[0];
    }
    return value;
};
var EditorAttributeNumber = function (_React$Component) {
    (0, _inherits3.default)(EditorAttributeNumber, _React$Component);

    function EditorAttributeNumber() {
        (0, _classCallCheck3.default)(this, EditorAttributeNumber);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditorAttributeNumber.__proto__ || Object.getPrototypeOf(EditorAttributeNumber)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditorAttributeNumber, [{
        key: "handleChangeValue",
        value: function handleChangeValue(value, unit) {
            var outputValue = parseFloat(value);
            if (this.props.editInfo.number && this.props.editInfo.number.inputRange && this.props.editInfo.number.outputRange) {
                outputValue = parseInputToOutRange(outputValue, this.props.editInfo.number.inputRange, this.props.editInfo.number.outputRange);
            }
            if (unit) {
                this.props.ViewportAction.updateCurrentEditComponentProps(this.props.editInfo.field, outputValue.toString() + unit);
            } else {
                this.props.ViewportAction.updateCurrentEditComponentProps(this.props.editInfo.field, outputValue);
            }
        }
    }, {
        key: "handleChange",
        value: function handleChange(event) {
            this.handleChangeValue(event.target.value, this.state.unit);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var inputValue = this.props.ViewportAction.getCurrentEditPropValueByEditInfo(this.props.editInfo);
            if (inputValue !== '' && this.props.editInfo.number && this.props.editInfo.number.outputRange) {
                inputValue = parseInputToOutRange(parseFloat(inputValue), this.props.editInfo.number.outputRange, this.props.editInfo.number.inputRange).toString();
            }
            var textOpts = {
                label: '',
                disabled: this.props.editInfo.editable === false,
                value: inputValue,
                onChange: function onChange(value, unit) {
                    _this2.handleChangeValue(value, unit);
                    _this2.setState({
                        unit: unit
                    });
                }
            };
            var InputElement = null;
            if (this.props.editInfo.number && this.props.editInfo.number.slider) {
                InputElement = React.createElement("div", { className: "range-container" }, React.createElement("input", { className: "range", max: this.props.editInfo.number.max, min: this.props.editInfo.number.min, step: this.props.editInfo.number.step, value: inputValue, disabled: this.props.editInfo.editable === false, onChange: this.handleChange.bind(this), type: "range" }), React.createElement(index_1.Number, __assign({}, this.props.editInfo.number, textOpts)));
            } else {
                InputElement = React.createElement(index_1.Number, __assign({}, this.props.editInfo.number, textOpts));
            }
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-editor_attribute_number" }, React.createElement("div", { className: "label" }, this.props.editInfo.label), React.createElement("div", { className: "input-container" }, InputElement));
        }
    }]);
    return EditorAttributeNumber;
}(React.Component);
EditorAttributeNumber.defaultProps = new typings.Props();
EditorAttributeNumber.position = 'editorAttributeNumber';
__decorate([index_2.autoBindMethod], EditorAttributeNumber.prototype, "handleChangeValue", null);
__decorate([index_2.autoBindMethod], EditorAttributeNumber.prototype, "handleChange", null);
EditorAttributeNumber = __decorate([EditorManager.observer(['ViewportStore', 'ViewportAction'])], EditorAttributeNumber);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorAttributeNumber;