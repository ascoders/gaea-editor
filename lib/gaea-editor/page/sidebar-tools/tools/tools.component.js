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
var typings = require("./tools.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-tabs');
var components_component_1 = require("./components/components.component");
var version_component_1 = require("./version/version.component");
var source_component_1 = require("./source/source.component");
require("./tools.css");
var Tools = function (_React$Component) {
    (0, _inherits3.default)(Tools, _React$Component);

    function Tools() {
        (0, _classCallCheck3.default)(this, Tools);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Tools.__proto__ || Object.getPrototypeOf(Tools)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Tools, [{
        key: "render",
        value: function render() {
            if (!this.props.application.explore) {
                return React.createElement(index_1.Tabs, { defaultActiveKey: "components", type: "retro", className: "nt-editor-gaea-editor-gaea_editor-page-sidebar_tools-tools" }, React.createElement(index_1.TabPanel, { tab: "组件", activeKey: "components", className: "tab-panel" }, React.createElement(components_component_1.default, null)), React.createElement(index_1.TabPanel, { tab: "版本", activeKey: "version", className: "tab-panel" }, React.createElement(version_component_1.default, null)), React.createElement(index_1.TabPanel, { tab: "资源", activeKey: "resource", className: "tab-panel" }, React.createElement(source_component_1.default, null)));
            } else {
                return React.createElement(index_1.Tabs, { defaultActiveKey: "components", type: "retro", className: "nt-editor-gaea-editor-gaea_editor-page-sidebar_tools-tools" }, React.createElement(index_1.TabPanel, { tab: "组件", activeKey: "components", className: "tab-panel" }, React.createElement(components_component_1.default, null)), React.createElement(index_1.TabPanel, { tab: "资源", activeKey: "resource", className: "tab-panel" }, React.createElement(source_component_1.default, null)));
            }
        }
    }]);
    return Tools;
}(React.Component);
Tools.defaultProps = new typings.Props();
Tools = __decorate([mobx_react_1.inject('application'), mobx_react_1.observer], Tools);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tools;