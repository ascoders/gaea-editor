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
var typings = require("./editor-attribute-position.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-button');
var index_2 = require('nt-web-number');
var index_3 = require('nt-web-tooltip');
require("./editor-attribute-position.css");
var EditorAttributePosition = function (_React$Component) {
    (0, _inherits3.default)(EditorAttributePosition, _React$Component);

    function EditorAttributePosition() {
        (0, _classCallCheck3.default)(this, EditorAttributePosition);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditorAttributePosition.__proto__ || Object.getPrototypeOf(EditorAttributePosition)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditorAttributePosition, [{
        key: "handleUpdate",
        value: function handleUpdate(field, value) {
            if (value === 'relative') {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.left', null);
                this.props.ViewportAction.updateCurrentEditComponentProps('style.top', null);
                this.props.ViewportAction.updateCurrentEditComponentProps('style.right', null);
                this.props.ViewportAction.updateCurrentEditComponentProps('style.bottom', null);
                this.props.ViewportAction.updateCurrentEditComponentProps('style.zIndex', null);
            } else if (value = 'absolute') {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.left', 0);
                this.props.ViewportAction.updateCurrentEditComponentProps('style.top', 0);
                this.props.ViewportAction.updateCurrentEditComponentProps('style.right', null);
                this.props.ViewportAction.updateCurrentEditComponentProps('style.bottom', null);
                this.props.ViewportAction.updateCurrentEditComponentProps('style.zIndex', 1);
            }
            this.props.ViewportAction.updateCurrentEditComponentProps(field, value);
        }
    }, {
        key: "stringifyNumber",
        value: function stringifyNumber(count) {
            if (count === null || count === undefined) {
                return '';
            }
            return count.toString();
        }
    }, {
        key: "parseToNumber",
        value: function parseToNumber(numberc) {
            if (numberc === '') {
                return null;
            } else {
                return parseInt(numberc);
            }
        }
    }, {
        key: "getLeftOrRight",
        value: function getLeftOrRight() {
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.left === null) {
                return 'right';
            } else {
                return 'left';
            }
        }
    }, {
        key: "getTopOrBottom",
        value: function getTopOrBottom() {
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.top === null) {
                return 'bottom';
            } else {
                return 'top';
            }
        }
    }, {
        key: "handleChangePositionNumber",
        value: function handleChangePositionNumber(position, value) {
            this.props.ViewportAction.updateCurrentEditComponentProps("style." + position, this.parseToNumber(value));
        }
    }, {
        key: "handleChangePosition",
        value: function handleChangePosition(x, y) {
            if (x === 'left') {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.left', 0);
                this.props.ViewportAction.updateCurrentEditComponentProps('style.right', null);
            } else {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.left', null);
                this.props.ViewportAction.updateCurrentEditComponentProps('style.right', 0);
            }
            if (y === 'top') {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.top', 0);
                this.props.ViewportAction.updateCurrentEditComponentProps('style.bottom', null);
            } else {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.top', null);
                this.props.ViewportAction.updateCurrentEditComponentProps('style.bottom', 0);
            }
        }
    }, {
        key: "handleChangeZindex",
        value: function handleChangeZindex(value) {
            this.props.ViewportAction.updateCurrentEditComponentProps("style.zIndex", this.parseToNumber(value));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-editor_attribute_position" }, React.createElement(index_1.ButtonGroup, null, React.createElement(index_3.Tooltip, { title: "相对上一个元素位置布局" }, React.createElement(index_1.Button, { style: { padding: '0 10px' }, active: this.props.ViewportStore.currentEditComponentInfo.props.style.position === 'relative', onClick: this.handleUpdate.bind(this, 'style.position', 'relative') }, "相对定位")), React.createElement(index_3.Tooltip, { title: "悬浮在页面之上" }, React.createElement(index_1.Button, { style: { padding: '0 10px' }, active: this.props.ViewportStore.currentEditComponentInfo.props.style.position === 'absolute', onClick: this.handleUpdate.bind(this, 'style.position', 'absolute') }, "绝对定位"))), this.props.ViewportStore.currentEditComponentInfo.props.style.position === 'absolute' && React.createElement("div", { className: "absolute-container" }, React.createElement("div", { className: "row" }, React.createElement("div", { className: "position-control-container" }, React.createElement(index_1.Button, { className: "left-top", active: this.getLeftOrRight() === 'left' && this.getTopOrBottom() === 'top', onClick: this.handleChangePosition.bind(this, 'left', 'top') }, React.createElement("i", { className: "fa fa-chevron-left" })), React.createElement(index_1.Button, { className: "right-top", active: this.getLeftOrRight() === 'right' && this.getTopOrBottom() === 'top', onClick: this.handleChangePosition.bind(this, 'right', 'top') }, React.createElement("i", { className: "fa fa-chevron-left" })), React.createElement(index_1.Button, { className: "left-bottom", active: this.getLeftOrRight() === 'left' && this.getTopOrBottom() === 'bottom', onClick: this.handleChangePosition.bind(this, 'left', 'bottom') }, React.createElement("i", { className: "fa fa-chevron-left" })), React.createElement(index_1.Button, { className: "right-bottom", active: this.getLeftOrRight() === 'right' && this.getTopOrBottom() === 'bottom', onClick: this.handleChangePosition.bind(this, 'right', 'bottom') }, React.createElement("i", { className: "fa fa-chevron-left" }))), React.createElement("div", { className: "position-number-container" }, React.createElement(index_2.Number, { label: "x", onChange: this.handleChangePositionNumber.bind(this, this.getLeftOrRight()), value: this.stringifyNumber(this.props.ViewportStore.currentEditComponentInfo.props.style[this.getLeftOrRight()]) }), React.createElement(index_2.Number, { label: "y", style: { marginLeft: 5 }, onChange: this.handleChangePositionNumber.bind(this, this.getTopOrBottom()), value: this.stringifyNumber(this.props.ViewportStore.currentEditComponentInfo.props.style[this.getTopOrBottom()]) }))), React.createElement("div", { className: "row", style: { marginTop: 10 } }, React.createElement(index_2.Number, { label: "zIndex", onChange: this.handleChangeZindex.bind(this), value: this.stringifyNumber(this.props.ViewportStore.currentEditComponentInfo.props.style.zIndex) }))));
        }
    }]);
    return EditorAttributePosition;
}(React.Component);
EditorAttributePosition.defaultProps = new typings.Props();
EditorAttributePosition.position = 'editorAttributePosition';
EditorAttributePosition = __decorate([EditorManager.observer(['ViewportStore', 'ViewportAction'])], EditorAttributePosition);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorAttributePosition;