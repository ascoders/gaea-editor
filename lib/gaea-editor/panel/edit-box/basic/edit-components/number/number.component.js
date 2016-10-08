"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var typings = require('./number.type');
var mobx_react_1 = require('mobx-react');
var index_1 = require('nt-web-number');
require('./number.css');
var parseInputToOutRange = function parseInputToOutRange(value, inputRange, outputRange) {
    if (value >= inputRange[0] && value <= inputRange[1]) {
        var percentage = (value - inputRange[0]) / (inputRange[1] - inputRange[0]);
        var outputLength = (outputRange[1] - outputRange[0]) * percentage;
        value = outputLength + outputRange[0];
    }
    return value;
};
var EditComponentNumber = function (_React$Component) {
    _inherits(EditComponentNumber, _React$Component);

    function EditComponentNumber() {
        var _ref;

        _classCallCheck(this, EditComponentNumber);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = EditComponentNumber.__proto__ || Object.getPrototypeOf(EditComponentNumber)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(EditComponentNumber, [{
        key: "handleChangeValue",
        value: function handleChangeValue(value, unit) {
            var outputValue = parseFloat(value);
            if (this.props.editOption.number.inputRange && this.props.editOption.number.outputRange) {
                outputValue = parseInputToOutRange(outputValue, this.props.editOption.number.inputRange, this.props.editOption.number.outputRange);
            }
            if (unit !== '') {
                this.props.viewport.updateComponentOptionsValue(this.props.editOption, outputValue.toString() + unit);
            } else {
                this.props.viewport.updateComponentOptionsValue(this.props.editOption, outputValue);
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

            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
            var inputValue = this.props.viewport.getPropsByFieldWithEditor(this.componentInfo.props, this.props.editOption);
            if (inputValue !== '') {
                inputValue = parseInputToOutRange(parseFloat(inputValue), this.props.editOption.number.outputRange, this.props.editOption.number.inputRange).toString();
            }
            var disabled = !this.props.editOption.editable;
            var textOpts = {
                label: '',
                disabled: disabled,
                value: inputValue,
                onChange: function onChange(value, unit) {
                    _this2.handleChangeValue(value, unit);
                    _this2.setState({
                        unit: unit
                    });
                }
            };
            if (this.props.editOption.number.slider) {
                return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-edit_components-number" }, React.createElement("input", { className: "range", max: this.props.editOption.number.max, min: this.props.editOption.number.min, step: this.props.editOption.number.step, value: inputValue, disabled: disabled, onChange: this.handleChange.bind(this), type: "range" }), React.createElement(index_1.default, __assign({}, this.props.editOption.number, textOpts)));
            } else {
                return React.createElement(index_1.default, __assign({}, this.props.editOption.number, textOpts));
            }
        }
    }]);

    return EditComponentNumber;
}(React.Component);
EditComponentNumber.defaultProps = new typings.Props();
EditComponentNumber = __decorate([mobx_react_1.inject('viewport'), mobx_react_1.observer], EditComponentNumber);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentNumber;