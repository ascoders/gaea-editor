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
var typings = require("./tab-tools-components.type");
var classNames = require("classnames");
var action_1 = require("./action");
var store_1 = require("./store");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-auto-bind');
require("./tab-tools-components.css");
var TabToolsComponents = function (_React$Component) {
    (0, _inherits3.default)(TabToolsComponents, _React$Component);

    function TabToolsComponents() {
        (0, _classCallCheck3.default)(this, TabToolsComponents);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TabToolsComponents.__proto__ || Object.getPrototypeOf(TabToolsComponents)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(TabToolsComponents, [{
        key: "componentWillMount",
        value: function componentWillMount() {}
    }, {
        key: "getTabItemClasses",
        value: function getTabItemClasses(activeName) {
            return classNames({
                'tab-item': true,
                'active': this.props.TabToolsComponentsStore.activeType === activeName
            });
        }
    }, {
        key: "handleChangeType",
        value: function handleChangeType(type) {
            this.props.TabToolsComponentsAction.setActiveTab(type);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-tab_tools_components" }, React.createElement("div", { className: "left-container" }, this.props.TabToolsComponentsStore.activeType === 'common' && this.props.ApplicationAction.loadingPluginByPosition('tabToolsComponentsCommon'), this.props.TabToolsComponentsStore.activeType === 'custom' && this.props.ApplicationAction.loadingPluginByPosition('tabToolsComponentsCustom'), this.props.TabToolsComponentsStore.activeType === 'combo' && this.props.ApplicationAction.loadingPluginByPosition('tabToolsComponentsCombo')), React.createElement("div", { className: "right-container" }, React.createElement("div", { className: this.getTabItemClasses('common'), onClick: this.handleChangeType.bind(this, 'common') }, "通用"), React.createElement("div", { className: this.getTabItemClasses('custom'), onClick: this.handleChangeType.bind(this, 'custom') }, "定制"), React.createElement("div", { className: this.getTabItemClasses('combo'), onClick: this.handleChangeType.bind(this, 'combo') }, "模板")));
        }
    }]);
    return TabToolsComponents;
}(React.Component);
TabToolsComponents.defaultProps = new typings.Props();
TabToolsComponents.position = 'tabToolsComponents';
TabToolsComponents.Action = action_1.default;
TabToolsComponents.Store = store_1.default;
__decorate([index_1.autoBindMethod], TabToolsComponents.prototype, "handleChangeType", null);
TabToolsComponents = __decorate([EditorManager.observer(['TabToolsComponentsStore', 'ApplicationAction', 'TabToolsComponentsAction'])], TabToolsComponents);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabToolsComponents;