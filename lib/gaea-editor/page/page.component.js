"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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
var typings = require("./page.type");
var mobx_react_1 = require("mobx-react");
var classNames = require("classnames");
var index_1 = require('nt-auto-bind');
var viewport_component_1 = require("./viewport/viewport.component");
var index_2 = require('gaea-preview');
var left_bar_component_1 = require("./left-bar/left-bar.component");
var svg_1 = require("./svg");
require("./page.css");
var Page = function (_React$Component) {
    (0, _inherits3.default)(Page, _React$Component);

    function Page() {
        (0, _classCallCheck3.default)(this, Page);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Page, [{
        key: "handleCloseEditor",
        value: function handleCloseEditor() {
            this.props.ViewportAction.setCurrentEditComponentMapUniqueKey(null);
        }
    }, {
        key: "handleCloseLeftBar",
        value: function handleCloseLeftBar() {
            this.props.ApplicationAction.toggleLeftBar(null);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var navbarBottomRightContainerClasses = classNames({
                'navbar-center__right-container': true,
                'show-editor-container': this.props.ViewportStore.currentEditComponentMapUniqueKey !== null,
                'transparent-background': this.props.ApplicationStore.viewportContainerStyle.backgroundColor === 'transparent',
                'show-left-bar': this.props.ApplicationStore.leftBarType !== null
            });
            setTimeout(function () {
                _this2.props.EventAction.emit(_this2.props.EventStore.viewportUpdated);
            }, 200);
            var viewportToolSwitchContainerClasses = classNames({
                'viewport-tool-switch-container': true,
                'preview': this.props.ApplicationStore.inPreview
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page" }, React.createElement(svg_1.default, null), React.createElement("div", { className: "outer-left-container" }, React.createElement("div", { className: "navbar-container", style: { height: this.props.ApplicationStore.navbarHeight } }, React.createElement("div", { className: "navbar-container__left" }, this.props.ApplicationAction.loadingPluginByPosition('navbarLeft')), React.createElement("div", { className: "navbar-container__right" }, this.props.ApplicationAction.loadingPluginByPosition('navbarRight'))), React.createElement("div", { className: "navbar-center-container" }, React.createElement("div", { className: "navbar-center__left-container" }, React.createElement("div", { className: "navbar-center__left__top-container" }, this.props.ApplicationAction.loadingPluginByPosition('leftBarTop')), React.createElement("div", { className: "navbar-center__left__bottom-container" }, this.props.ApplicationAction.loadingPluginByPosition('leftBarBottom'))), React.createElement("div", { className: navbarBottomRightContainerClasses, style: (0, _extends3.default)({}, this.props.ApplicationStore.viewportContainerStyle) }, React.createElement("div", { className: "left-bar-container" }, React.createElement(left_bar_component_1.default, null), React.createElement("div", { onClick: this.handleCloseLeftBar, className: "left-bar-close" }, React.createElement("i", { className: "fa fa-close close-button" }))), React.createElement("div", { className: "viewport-container", style: (0, _extends3.default)({}, this.props.ApplicationStore.viewportStyle, { display: this.props.ApplicationStore.inPreview ? 'none' : null }) }, React.createElement(viewport_component_1.default, null), this.props.ApplicationAction.loadingPluginByPosition('viewport')), this.props.ApplicationStore.inPreview && React.createElement("div", { className: "preview-container", style: (0, _extends3.default)({}, this.props.ApplicationStore.viewportStyle) }, React.createElement(index_2.default, { value: this.props.ViewportAction.getIncrementComponentsInfo(), baseComponents: this.props.ApplicationStore.editorProps.commonComponents, customComponents: this.props.ApplicationStore.editorProps.customComponents }), this.props.ApplicationAction.loadingPluginByPosition('preview')), React.createElement("div", { className: "editor-container" }, this.props.ApplicationAction.loadingPluginByPosition('editor'), React.createElement("div", { onClick: this.handleCloseEditor, className: "editor-close" }, React.createElement("i", { className: "fa fa-close close-button" }))))), React.createElement("div", { className: "navbar-bottom-container" }, this.props.ApplicationAction.loadingPluginByPosition('bottomBar'))), React.createElement("div", { className: "outer-right-container" }, React.createElement("div", { className: viewportToolSwitchContainerClasses }, React.createElement("div", { className: "viewport-tool-container" }, React.createElement("div", { className: "outer-right__top-container" }, this.props.ApplicationAction.loadingPluginByPosition('mainToolTop')), React.createElement("div", { className: "outer-right__bottom-container" }, this.props.ApplicationAction.loadingPluginByPosition('mainToolBottom'))), React.createElement("div", { className: "preview-tool-container" }, "您处于预览状态"))));
        }
    }]);
    return Page;
}(React.Component);
Page.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], Page.prototype, "handleCloseEditor", null);
__decorate([index_1.autoBindMethod], Page.prototype, "handleCloseLeftBar", null);
Page = __decorate([mobx_react_1.observer(['ApplicationStore', 'ViewportStore', 'EventStore', 'ApplicationAction', 'EventAction', 'ViewportAction'])], Page);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;