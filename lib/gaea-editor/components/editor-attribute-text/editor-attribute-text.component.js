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
var typings = require("./editor-attribute-text.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-input');
var index_2 = require('nt-auto-bind');
require("./editor-attribute-text.css");
var EditorAttributeText = function (_React$Component) {
    (0, _inherits3.default)(EditorAttributeText, _React$Component);

    function EditorAttributeText() {
        (0, _classCallCheck3.default)(this, EditorAttributeText);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditorAttributeText.__proto__ || Object.getPrototypeOf(EditorAttributeText)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditorAttributeText, [{
        key: "handleChange",
        value: function handleChange(value) {
            this.props.ViewportAction.setComponentProps(this.props.ViewportStore.currentEditComponentMapUniqueKey, this.props.editInfo.field, value);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-editor_attribute_text" }, React.createElement("div", { className: "label" }, this.props.editInfo.label), React.createElement("div", { className: "input-container" }, React.createElement(index_1.Input, { label: "", disabled: this.props.editInfo.editable === false, onChange: this.handleChange, value: this.props.ViewportAction.getCurrentEditPropValueByEditInfo(this.props.editInfo) })));
        }
    }]);
    return EditorAttributeText;
}(React.Component);
EditorAttributeText.defaultProps = new typings.Props();
EditorAttributeText.position = 'editorAttributeText';
__decorate([index_2.autoBindMethod], EditorAttributeText.prototype, "handleChange", null);
EditorAttributeText = __decorate([EditorManager.observer(['ViewportStore', 'ViewportAction'])], EditorAttributeText);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorAttributeText;