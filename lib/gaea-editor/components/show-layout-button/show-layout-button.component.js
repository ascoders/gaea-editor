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
var typings = require("./show-layout-button.type");
var classNames = require("classnames");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-tooltip');
require("./show-layout-button.css");
var ShowLayoutButton = function (_React$Component) {
    (0, _inherits3.default)(ShowLayoutButton, _React$Component);

    function ShowLayoutButton() {
        (0, _classCallCheck3.default)(this, ShowLayoutButton);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ShowLayoutButton.__proto__ || Object.getPrototypeOf(ShowLayoutButton)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(ShowLayoutButton, [{
        key: "handleClick",
        value: function handleClick() {
            this.props.ViewportAction.setLayoutComponentActive(!this.props.ViewportStore.isLayoutComponentActive);
        }
    }, {
        key: "render",
        value: function render() {
            var classes = classNames({
                'nt-editor-gaea-editor-gaea_editor-components-show_layout_button': true,
                'active': this.props.ViewportStore.isLayoutComponentActive
            });
            return React.createElement(index_2.Tooltip, { title: "布局元素显示边框" }, React.createElement("div", { className: classes, onClick: this.handleClick }, React.createElement("i", { className: "fa fa-eye" })));
        }
    }]);
    return ShowLayoutButton;
}(React.Component);
ShowLayoutButton.defaultProps = new typings.Props();
ShowLayoutButton.position = 'leftBarBottom';
__decorate([index_1.autoBindMethod], ShowLayoutButton.prototype, "handleClick", null);
ShowLayoutButton = __decorate([EditorManager.observer(['ViewportStore', 'ViewportAction'])], ShowLayoutButton);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShowLayoutButton;