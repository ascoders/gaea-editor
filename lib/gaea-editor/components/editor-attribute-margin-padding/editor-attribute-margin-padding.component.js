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
var typings = require("./editor-attribute-margin-padding.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-margin-padding-editor');
require("./editor-attribute-margin-padding.css");
var EditorAttributeMarginPadding = function (_React$Component) {
    (0, _inherits3.default)(EditorAttributeMarginPadding, _React$Component);

    function EditorAttributeMarginPadding() {
        (0, _classCallCheck3.default)(this, EditorAttributeMarginPadding);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditorAttributeMarginPadding.__proto__ || Object.getPrototypeOf(EditorAttributeMarginPadding)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditorAttributeMarginPadding, [{
        key: "handleStart",
        value: function handleStart() {}
    }, {
        key: "handleChange",
        value: function handleChange(name, value) {
            this.props.ViewportAction.updateCurrentEditComponentProps("style." + name, value);
        }
    }, {
        key: "handleFinalChange",
        value: function handleFinalChange(name, value) {
            this.props.ViewportAction.updateCurrentEditComponentProps("style." + name, value);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-editor_attribute_margin_padding" }, React.createElement(index_1.default, { size: 220, onStart: this.handleStart.bind(this), marginLeft: this.props.ViewportStore.currentEditComponentInfo.props.style.marginLeft, marginTop: this.props.ViewportStore.currentEditComponentInfo.props.style.marginTop, marginRight: this.props.ViewportStore.currentEditComponentInfo.props.style.marginRight, marginBottom: this.props.ViewportStore.currentEditComponentInfo.props.style.marginBottom, paddingLeft: this.props.ViewportStore.currentEditComponentInfo.props.style.paddingLeft, paddingTop: this.props.ViewportStore.currentEditComponentInfo.props.style.paddingTop, paddingRight: this.props.ViewportStore.currentEditComponentInfo.props.style.paddingRight, paddingBottom: this.props.ViewportStore.currentEditComponentInfo.props.style.paddingBottom, onChange: this.handleChange.bind(this), onFinalChange: this.handleFinalChange.bind(this) }));
        }
    }]);
    return EditorAttributeMarginPadding;
}(React.Component);
EditorAttributeMarginPadding.defaultProps = new typings.Props();
EditorAttributeMarginPadding.position = 'editorAttributeMarginPadding';
EditorAttributeMarginPadding = __decorate([EditorManager.observer(['ViewportStore', 'ApplicationStore', 'ViewportAction'])], EditorAttributeMarginPadding);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorAttributeMarginPadding;