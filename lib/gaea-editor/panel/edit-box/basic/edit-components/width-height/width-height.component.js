"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var typings = require("./width-height.type");
var mobx_react_1 = require("mobx-react");
var _ = require("lodash");
var index_1 = require("../../../../../../../../web-common/number/index");
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
    _inherits(EditComponentWidthHeight, _React$Component);

    function EditComponentWidthHeight() {
        _classCallCheck(this, EditComponentWidthHeight);

        var _this = _possibleConstructorReturn(this, (EditComponentWidthHeight.__proto__ || Object.getPrototypeOf(EditComponentWidthHeight)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(EditComponentWidthHeight, [{
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
            this.setState(_defineProperty({}, field, value));
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