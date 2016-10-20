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
var typings = require("./font.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-select');
var index_2 = require('nt-web-tooltip');
var index_3 = require('nt-web-button');
var index_4 = require('nt-web-number');
var color_component_1 = require("../../utils/color/color.component");
require("./font.css");
var fontWeightOpts = [{
    key: '100',
    value: '100 - Thin'
}, {
    key: '200',
    value: '200 - Extra Light'
}, {
    key: '300',
    value: '300 - Light'
}, {
    key: '400',
    value: '400 - Normal'
}, {
    key: '500',
    value: '500 - Medium'
}, {
    key: '600',
    value: '600 - Semi Bold'
}, {
    key: '700',
    value: '700 - Bold'
}, {
    key: '800',
    value: '800 - Extra Bold'
}, {
    key: '900',
    value: '900 - Black'
}];
var EditComponentFont = function (_React$Component) {
    (0, _inherits3.default)(EditComponentFont, _React$Component);

    function EditComponentFont() {
        (0, _classCallCheck3.default)(this, EditComponentFont);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditComponentFont.__proto__ || Object.getPrototypeOf(EditComponentFont)).apply(this, arguments));

        _this.state = new typings.State();
        _this.colorChangeStatus = 'finish';
        return _this;
    }

    (0, _createClass3.default)(EditComponentFont, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
        }
    }, {
        key: "handleChangeFontWeight",
        value: function handleChangeFontWeight(value) {
            this.props.viewport.updateComponentValue('style.fontWeight', value);
        }
    }, {
        key: "handleChangeFontSize",
        value: function handleChangeFontSize(value) {
            if (value === '') {
                this.props.viewport.updateComponentValue('style.fontSize', null);
            } else {
                this.props.viewport.updateComponentValue('style.fontSize', parseInt(value));
            }
        }
    }, {
        key: "handleChangeLineHeight",
        value: function handleChangeLineHeight(value) {
            if (value === '') {
                this.props.viewport.updateComponentValue('style.lineHeight', null);
            } else {
                this.props.viewport.updateComponentValue('style.lineHeight', parseInt(value));
            }
        }
    }, {
        key: "handleChange",
        value: function handleChange(field, value) {
            this.props.viewport.updateComponentValue(field, value);
        }
    }, {
        key: "handleColorChange",
        value: function handleColorChange(color) {
            if (this.colorChangeStatus === 'finish') {
                this.colorChangeStatus = 'start';
                this.props.viewport.prepareWriteHistory();
            }
            this.props.viewport.updateComponentValueWithNoHistory('style.color', "rgba(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ", " + color.rgb.a + ")");
        }
    }, {
        key: "handleColorChangeComplete",
        value: function handleColorChangeComplete(color) {
            this.colorChangeStatus = 'finish';
            this.props.viewport.writeHistory();
        }
    }, {
        key: "handleChangeWrap",
        value: function handleChangeWrap(type) {
            switch (type) {
                case 1:
                    this.props.viewport.prepareWriteHistory();
                    this.props.viewport.updateComponentValueWithNoHistory('style.whiteSpace', null);
                    this.props.viewport.updateComponentValueWithNoHistory('style.wordBreak', 'normal');
                    this.props.viewport.writeHistory();
                    break;
                case 2:
                    this.props.viewport.prepareWriteHistory();
                    this.props.viewport.updateComponentValueWithNoHistory('style.whiteSpace', 'nowrap');
                    this.props.viewport.updateComponentValueWithNoHistory('style.wordBreak', 'normal');
                    this.props.viewport.writeHistory();
                    break;
                case 3:
                    this.props.viewport.prepareWriteHistory();
                    this.props.viewport.updateComponentValueWithNoHistory('style.whiteSpace', null);
                    this.props.viewport.updateComponentValueWithNoHistory('style.wordBreak', 'break-all');
                    this.props.viewport.writeHistory();
                    break;
            }
        }
    }, {
        key: "render",
        value: function render() {
            var fontWeight = {
                defaultValue: this.componentInfo.props.style.fontWeight ? this.componentInfo.props.style.fontWeight.toString() : '400',
                options: fontWeightOpts
            };
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-edit_components-font" }, React.createElement("div", { className: "row-container" }, React.createElement("div", { className: "left-container" }, React.createElement("div", { className: "icon-container" }, "FW"), React.createElement(index_1.Select, __assign({ label: "" }, fontWeight, { onChange: this.handleChangeFontWeight.bind(this) }))), React.createElement("div", { className: "right-container" }, React.createElement("div", { className: "icon-container" }, "QX"), React.createElement(index_3.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: "普通" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.fontStyle === 'normal', onClick: this.handleChange.bind(this, 'style.fontStyle', 'normal') }, "1")), React.createElement(index_2.Tooltip, { title: "倾斜" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.fontStyle === 'italic', onClick: this.handleChange.bind(this, 'style.fontStyle', 'italic') }, "2"))))), React.createElement("div", { className: "row-container" }, React.createElement("div", { className: "left-container" }, React.createElement("div", { className: "icon-container" }, "Color"), React.createElement(color_component_1.default, { onChange: this.handleColorChange.bind(this), onChangeComplete: this.handleColorChangeComplete.bind(this), color: this.componentInfo.props.style.color || 'rgba(1,1,1,1)' })), React.createElement("div", { className: "right-container-2" }, React.createElement("div", { className: "icon-container" }, "Size"), React.createElement(index_4.Number, { label: "", placeholder: "Null", value: this.componentInfo.props.style.fontSize ? this.componentInfo.props.style.fontSize.toString() : '', onChange: this.handleChangeFontSize.bind(this) }))), React.createElement("div", { className: "row-container" }, React.createElement("div", { className: "left-container" }, React.createElement("div", { className: "icon-container" }, "行高"), React.createElement(index_4.Number, { label: "", placeholder: "Null", value: this.componentInfo.props.style.lineHeight ? this.componentInfo.props.style.lineHeight.toString() : '', onChange: this.handleChangeLineHeight.bind(this) }))), React.createElement("div", { className: "row-container" }, React.createElement("div", { className: "left-container" }, React.createElement("div", { className: "icon-container" }, "对齐"), React.createElement(index_3.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: "左对齐" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.textAlign === 'left', onClick: this.handleChange.bind(this, 'style.textAlign', 'left') }, "1")), React.createElement(index_2.Tooltip, { title: "居中" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.textAlign === 'center', onClick: this.handleChange.bind(this, 'style.textAlign', 'center') }, "2")), React.createElement(index_2.Tooltip, { title: "右对齐" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.textAlign === 'right', onClick: this.handleChange.bind(this, 'style.textAlign', 'right') }, "3")), React.createElement(index_2.Tooltip, { title: "左右对齐" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.textAlign === 'justify', onClick: this.handleChange.bind(this, 'style.textAlign', 'justify') }, "4"))))), React.createElement("div", { className: "row-container" }, React.createElement("div", { className: "left-container" }, React.createElement("div", { className: "icon-container" }, "划线"), this.props.application.isReactNative ? React.createElement(index_3.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: "无" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.textDecorationLine === 'none', onClick: this.handleChange.bind(this, 'style.textDecorationLine', 'none') }, "1")), React.createElement(index_2.Tooltip, { title: "下划线" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.textDecorationLine === 'underline', onClick: this.handleChange.bind(this, 'style.textDecorationLine', 'underline') }, "2")), React.createElement(index_2.Tooltip, { title: "中划线" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.textDecorationLine === 'line-through', onClick: this.handleChange.bind(this, 'style.textDecorationLine', 'line-through') }, "4")), React.createElement(index_2.Tooltip, { title: "中下划线" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.textDecorationLine === 'underline line-through', onClick: this.handleChange.bind(this, 'style.textDecorationLine', 'underline line-through') }, "5"))) : React.createElement(index_3.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: "无" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.textDecoration === 'none', onClick: this.handleChange.bind(this, 'style.textDecoration', 'none') }, "1")), React.createElement(index_2.Tooltip, { title: "下划线" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.textDecoration === 'underline', onClick: this.handleChange.bind(this, 'style.textDecoration', 'underline') }, "2")), React.createElement(index_2.Tooltip, { title: "上划线" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.textDecoration === 'overline', onClick: this.handleChange.bind(this, 'style.textDecoration', 'overline') }, "3")), React.createElement(index_2.Tooltip, { title: "中划线" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.textDecoration === 'line-through', onClick: this.handleChange.bind(this, 'style.textDecoration', 'line-through') }, "4")), React.createElement(index_2.Tooltip, { title: "中下划线" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.textDecoration === 'underline line-through', onClick: this.handleChange.bind(this, 'style.textDecoration', 'underline line-through') }, "5"))))), !this.props.application.isReactNative && React.createElement("div", { className: "row-container" }, React.createElement("div", { className: "left-container" }, React.createElement("div", { className: "icon-container" }, "换行"), React.createElement(index_3.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: "自动" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.wordBreak === 'normal' && this.componentInfo.props.style.whiteSpace === null, onClick: this.handleChangeWrap.bind(this, 1) }, "1")), React.createElement(index_2.Tooltip, { title: "不换行" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.whiteSpace === 'nowrap', onClick: this.handleChangeWrap.bind(this, 2) }, "2")), React.createElement(index_2.Tooltip, { title: "强制换行" }, React.createElement(index_3.Button, { active: this.componentInfo.props.style.wordBreak === 'break-all', onClick: this.handleChangeWrap.bind(this, 3) }, "3"))))));
        }
    }]);
    return EditComponentFont;
}(React.Component);
EditComponentFont.defaultProps = new typings.Props();
EditComponentFont = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], EditComponentFont);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentFont;