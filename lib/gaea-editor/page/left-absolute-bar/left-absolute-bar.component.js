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
var typings = require("./left-absolute-bar.type");
var mobx_react_1 = require("mobx-react");
var classNames = require("classnames");
var index_1 = require('nt-web-tooltip');
require("./left-absolute-bar.css");
var LeftAbsoluteBar = function (_React$Component) {
    (0, _inherits3.default)(LeftAbsoluteBar, _React$Component);

    function LeftAbsoluteBar() {
        (0, _classCallCheck3.default)(this, LeftAbsoluteBar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (LeftAbsoluteBar.__proto__ || Object.getPrototypeOf(LeftAbsoluteBar)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(LeftAbsoluteBar, [{
        key: "toggleShowLayoutBorder",
        value: function toggleShowLayoutBorder() {
            this.props.viewport.setShowLayoutBorder(!this.props.viewport.showLayoutBorder);
        }
    }, {
        key: "toggleShowTemplate",
        value: function toggleShowTemplate() {
            if (!this.props.viewport.isShowLeftBar) {
                this.props.viewport.showLeftBar('template');
            } else {
                this.props.viewport.hideLeftBar();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var templateClasses = classNames({
                'menu-item': true,
                'active': this.props.viewport.isShowLeftBar
            });
            var showLayoutClasses = classNames({
                'menu-item': true,
                'active': this.props.viewport.isMovingComponent || this.props.viewport.showLayoutBorder
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-left_absolute_bar" }, React.createElement("div", { className: "top" }, React.createElement(index_1.Tooltip, { position: "right", title: "模板列表" }, React.createElement("div", { className: templateClasses, onClick: this.toggleShowTemplate.bind(this) }, React.createElement("i", { className: "fa fa-list-alt" })))), React.createElement("div", { className: "bottom" }, React.createElement(index_1.Tooltip, { position: "right", title: "显示空布局块" }, React.createElement("div", { className: showLayoutClasses, onClick: this.toggleShowLayoutBorder.bind(this) }, React.createElement("i", { className: "fa fa-eye" })))));
        }
    }]);
    return LeftAbsoluteBar;
}(React.Component);
LeftAbsoluteBar.defaultProps = new typings.Props();
LeftAbsoluteBar = __decorate([mobx_react_1.inject('application', 'viewport'), mobx_react_1.observer], LeftAbsoluteBar);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LeftAbsoluteBar;