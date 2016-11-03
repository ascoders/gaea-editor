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
var typings = require("./position.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-button');
var index_2 = require('nt-web-number');
var index_3 = require('nt-web-tooltip');
require("./position.css");
var EditComponentPosition = function (_React$Component) {
    (0, _inherits3.default)(EditComponentPosition, _React$Component);

    function EditComponentPosition() {
        (0, _classCallCheck3.default)(this, EditComponentPosition);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditComponentPosition.__proto__ || Object.getPrototypeOf(EditComponentPosition)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditComponentPosition, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
        }
    }, {
        key: "handleUpdate",
        value: function handleUpdate(field, value) {
            this.props.viewport.prepareWriteHistory();
            if (value === 'relative') {
                this.props.viewport.updateComponentValueWithNoHistory('style.left', null);
                this.props.viewport.updateComponentValueWithNoHistory('style.top', null);
                this.props.viewport.updateComponentValueWithNoHistory('style.right', null);
                this.props.viewport.updateComponentValueWithNoHistory('style.bottom', null);
                this.props.viewport.updateComponentValueWithNoHistory('style.zIndex', null);
            } else if (value = 'absolute') {
                this.props.viewport.updateComponentValueWithNoHistory('style.left', 0);
                this.props.viewport.updateComponentValueWithNoHistory('style.top', 0);
                this.props.viewport.updateComponentValueWithNoHistory('style.right', null);
                this.props.viewport.updateComponentValueWithNoHistory('style.bottom', null);
                this.props.viewport.updateComponentValueWithNoHistory('style.zIndex', 1);
            }
            this.props.viewport.updateComponentValueWithNoHistory(field, value);
            this.props.viewport.writeHistory();
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
            if (this.componentInfo.props.style.left === null) {
                return 'right';
            } else {
                return 'left';
            }
        }
    }, {
        key: "getTopOrBottom",
        value: function getTopOrBottom() {
            if (this.componentInfo.props.style.top === null) {
                return 'bottom';
            } else {
                return 'top';
            }
        }
    }, {
        key: "handleChangePositionNumber",
        value: function handleChangePositionNumber(position, value) {
            this.props.viewport.updateComponentValue("style." + position, this.parseToNumber(value));
        }
    }, {
        key: "handleChangePosition",
        value: function handleChangePosition(x, y) {
            this.props.viewport.prepareWriteHistory();
            if (x === 'left') {
                this.props.viewport.updateComponentValueWithNoHistory('style.left', 0);
                this.props.viewport.updateComponentValueWithNoHistory('style.right', null);
            } else {
                this.props.viewport.updateComponentValueWithNoHistory('style.left', null);
                this.props.viewport.updateComponentValueWithNoHistory('style.right', 0);
            }
            if (y === 'top') {
                this.props.viewport.updateComponentValueWithNoHistory('style.top', 0);
                this.props.viewport.updateComponentValueWithNoHistory('style.bottom', null);
            } else {
                this.props.viewport.updateComponentValueWithNoHistory('style.top', null);
                this.props.viewport.updateComponentValueWithNoHistory('style.bottom', 0);
            }
            this.props.viewport.writeHistory();
        }
    }, {
        key: "handleChangeZindex",
        value: function handleChangeZindex(value) {
            this.props.viewport.updateComponentValue("style.zIndex", this.parseToNumber(value));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-edit_components-position" }, React.createElement(index_1.ButtonGroup, null, React.createElement(index_3.Tooltip, { title: "相对上一个元素位置布局" }, React.createElement(index_1.Button, { style: { padding: '0 10px' }, active: this.componentInfo.props.style.position === 'relative', onClick: this.handleUpdate.bind(this, 'style.position', 'relative') }, "相对定位")), React.createElement(index_3.Tooltip, { title: "悬浮在页面之上" }, React.createElement(index_1.Button, { style: { padding: '0 10px' }, active: this.componentInfo.props.style.position === 'absolute', onClick: this.handleUpdate.bind(this, 'style.position', 'absolute') }, "绝对定位"))), this.componentInfo.props.style.position === 'absolute' && React.createElement("div", { className: "absolute-container" }, React.createElement("div", { className: "row" }, React.createElement("div", { className: "position-control-container" }, React.createElement(index_1.Button, { className: "left-top", active: this.getLeftOrRight() === 'left' && this.getTopOrBottom() === 'top', onClick: this.handleChangePosition.bind(this, 'left', 'top') }, React.createElement("i", { className: "fa fa-chevron-left" })), React.createElement(index_1.Button, { className: "right-top", active: this.getLeftOrRight() === 'right' && this.getTopOrBottom() === 'top', onClick: this.handleChangePosition.bind(this, 'right', 'top') }, React.createElement("i", { className: "fa fa-chevron-left" })), React.createElement(index_1.Button, { className: "left-bottom", active: this.getLeftOrRight() === 'left' && this.getTopOrBottom() === 'bottom', onClick: this.handleChangePosition.bind(this, 'left', 'bottom') }, React.createElement("i", { className: "fa fa-chevron-left" })), React.createElement(index_1.Button, { className: "right-bottom", active: this.getLeftOrRight() === 'right' && this.getTopOrBottom() === 'bottom', onClick: this.handleChangePosition.bind(this, 'right', 'bottom') }, React.createElement("i", { className: "fa fa-chevron-left" }))), React.createElement("div", { className: "position-number-container" }, React.createElement(index_2.Number, { label: "x", onChange: this.handleChangePositionNumber.bind(this, this.getLeftOrRight()), value: this.stringifyNumber(this.componentInfo.props.style[this.getLeftOrRight()]) }), React.createElement(index_2.Number, { label: "y", style: { marginLeft: 5 }, onChange: this.handleChangePositionNumber.bind(this, this.getTopOrBottom()), value: this.stringifyNumber(this.componentInfo.props.style[this.getTopOrBottom()]) }))), React.createElement("div", { className: "row", style: { marginTop: 10 } }, React.createElement(index_2.Number, { label: "zIndex", onChange: this.handleChangeZindex.bind(this), value: this.stringifyNumber(this.componentInfo.props.style.zIndex) }))));
        }
    }]);
    return EditComponentPosition;
}(React.Component);
EditComponentPosition.defaultProps = new typings.Props();
EditComponentPosition = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], EditComponentPosition);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentPosition;