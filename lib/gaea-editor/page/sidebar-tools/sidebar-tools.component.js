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
var typings = require("./sidebar-tools.type");
var mobx_react_1 = require("mobx-react");
var classNames = require("classnames");
var tools_component_1 = require("./tools/tools.component");
var tree_component_1 = require("./tree/tree.component");
require("./sidebar-tools.css");
var SidebarTools = function (_React$Component) {
    (0, _inherits3.default)(SidebarTools, _React$Component);

    function SidebarTools() {
        (0, _classCallCheck3.default)(this, SidebarTools);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SidebarTools.__proto__ || Object.getPrototypeOf(SidebarTools)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(SidebarTools, [{
        key: "render",
        value: function render() {
            var classes = classNames({
                'nt-editor-gaea-editor-gaea_editor-page-sidebar_tools': true
            });
            var style = {
                transform: this.props.application.isPreview ? "translate3d(" + this.props.application.sidebarWidth + "px, 0, 0)" : 'translate3d(0, 0, 0)',
                width: this.props.application.sidebarWidth
            };
            return React.createElement("div", { style: style, className: classes }, React.createElement(tools_component_1.default, null), React.createElement(tree_component_1.default, null));
        }
    }]);
    return SidebarTools;
}(React.Component);
SidebarTools.defaultProps = new typings.Props();
SidebarTools = __decorate([mobx_react_1.inject('application'), mobx_react_1.observer], SidebarTools);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SidebarTools;