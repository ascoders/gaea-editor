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
var typings = require("./viewport-size.type");
var classNames = require("classnames");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-auto-bind');
require("./viewport-size.css");
var ViewportSize = function (_React$Component) {
    (0, _inherits3.default)(ViewportSize, _React$Component);

    function ViewportSize() {
        (0, _classCallCheck3.default)(this, ViewportSize);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ViewportSize.__proto__ || Object.getPrototypeOf(ViewportSize)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(ViewportSize, [{
        key: "changeFitInWeb",
        value: function changeFitInWeb(type) {
            this.props.GlobalSettingAction.changeFitInWeb(type);
        }
    }, {
        key: "handleChangeMobileSize",
        value: function handleChangeMobileSize(width, height) {
            this.props.GlobalSettingAction.changeFitInWeb('mobile');
            this.props.GlobalSettingAction.setViewportSize(width, height);
        }
    }, {
        key: "render",
        value: function render() {
            var mobileClasses = classNames({
                'menu-item': true,
                'mobile-root': true,
                'viewport-size-active': this.props.GlobalSettingStore.fitInWeb === 'mobile'
            });
            var desktopClasses = classNames({
                'menu-item': true,
                'viewport-size-active': this.props.GlobalSettingStore.fitInWeb === 'pc'
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-viewport_size no-style" }, React.createElement("div", { className: mobileClasses }, React.createElement("i", { className: "fa fa-mobile" }), React.createElement("div", { className: "mobile-container" }, React.createElement("div", { className: classNames({
                    'phone': true,
                    'active': this.props.GlobalSettingStore.fitInWeb === 'mobile' && this.props.GlobalSettingStore.viewportWidth === 640 / 2 && this.props.GlobalSettingStore.viewportHeight === 1136 / 2
                }), onClick: this.handleChangeMobileSize.bind(this, 640 / 2, 1136 / 2) }, React.createElement("i", { className: "fa fa-mobile" }), React.createElement("div", null, "iPhone5s")), React.createElement("div", { className: classNames({
                    'phone': true,
                    'active': this.props.GlobalSettingStore.fitInWeb === 'mobile' && this.props.GlobalSettingStore.viewportWidth === 720 / 2 && this.props.GlobalSettingStore.viewportHeight === 1280 / 2
                }), onClick: this.handleChangeMobileSize.bind(this, 720 / 2, 1280 / 2) }, React.createElement("i", { className: "fa fa-mobile" }), React.createElement("div", null, "Android")), React.createElement("div", { className: classNames({
                    'phone': true,
                    'active': this.props.GlobalSettingStore.fitInWeb === 'mobile' && this.props.GlobalSettingStore.viewportWidth === 750 / 2 && this.props.GlobalSettingStore.viewportHeight === 1334 / 2
                }), onClick: this.handleChangeMobileSize.bind(this, 750 / 2, 1334 / 2) }, React.createElement("i", { className: "fa fa-mobile" }), React.createElement("div", null, "iPhone6")), React.createElement("div", { className: classNames({
                    'phone': true,
                    'active': this.props.GlobalSettingStore.fitInWeb === 'mobile' && this.props.GlobalSettingStore.viewportWidth === 828 / 2.5 && this.props.GlobalSettingStore.viewportHeight === 1472 / 2.5
                }), onClick: this.handleChangeMobileSize.bind(this, 828 / 2.5, 1472 / 2.5) }, React.createElement("i", { className: "fa fa-mobile" }), React.createElement("div", null, "iPhone7")))), React.createElement("div", { className: desktopClasses, onClick: this.changeFitInWeb.bind(this, 'pc') }, React.createElement("i", { className: "fa fa-desktop" })));
        }
    }]);
    return ViewportSize;
}(React.Component);
ViewportSize.defaultProps = new typings.Props();
ViewportSize.position = 'navbarRight';
__decorate([index_1.autoBindMethod], ViewportSize.prototype, "changeFitInWeb", null);
__decorate([index_1.autoBindMethod], ViewportSize.prototype, "handleChangeMobileSize", null);
ViewportSize = __decorate([EditorManager.observer(['ApplicationStore', 'GlobalSettingStore', 'ViewportAction', 'GlobalSettingAction'])], ViewportSize);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewportSize;