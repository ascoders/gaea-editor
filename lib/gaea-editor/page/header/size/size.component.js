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
var typings = require("./size.type");
var mobx_react_1 = require("mobx-react");
var classNames = require("classnames");
var index_1 = require('nt-auto-bind');
require("./size.css");
var Size = function (_React$Component) {
    (0, _inherits3.default)(Size, _React$Component);

    function Size() {
        (0, _classCallCheck3.default)(this, Size);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Size.__proto__ || Object.getPrototypeOf(Size)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Size, [{
        key: "changeFitInWeb",
        value: function changeFitInWeb(type) {
            this.props.setting.changeFitInWeb(type);
        }
    }, {
        key: "handleChangeMobileSize",
        value: function handleChangeMobileSize(width, height) {
            this.props.setting.changeFitInWeb('mobile');
            this.props.setting.setViewportSize(width, height);
        }
    }, {
        key: "render",
        value: function render() {
            var mobileClasses = classNames({
                'menu-item': true,
                'mobile-root': true,
                'viewport-size-active': this.props.setting.data.fitInWeb === 'mobile'
            });
            var desktopClasses = classNames({
                'menu-item': true,
                'viewport-size-active': this.props.setting.data.fitInWeb === 'pc'
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-header-size" }, React.createElement("div", { className: mobileClasses }, React.createElement("i", { className: "fa fa-mobile" }), React.createElement("div", { className: "mobile-container" }, React.createElement("div", { className: classNames({
                    'phone': true,
                    'active': this.props.setting.data.fitInWeb === 'mobile' && this.props.setting.data.viewportWidth === 640 / 2 && this.props.setting.data.viewportHeight === 1136 / 2
                }), onClick: this.handleChangeMobileSize.bind(this, 640 / 2, 1136 / 2) }, React.createElement("i", { className: "fa fa-mobile" }), React.createElement("div", null, "iPhone5s")), React.createElement("div", { className: classNames({
                    'phone': true,
                    'active': this.props.setting.data.fitInWeb === 'mobile' && this.props.setting.data.viewportWidth === 720 / 2 && this.props.setting.data.viewportHeight === 1280 / 2
                }), onClick: this.handleChangeMobileSize.bind(this, 720 / 2, 1280 / 2) }, React.createElement("i", { className: "fa fa-mobile" }), React.createElement("div", null, "Android")), React.createElement("div", { className: classNames({
                    'phone': true,
                    'active': this.props.setting.data.fitInWeb === 'mobile' && this.props.setting.data.viewportWidth === 750 / 2 && this.props.setting.data.viewportHeight === 1334 / 2
                }), onClick: this.handleChangeMobileSize.bind(this, 750 / 2, 1334 / 2) }, React.createElement("i", { className: "fa fa-mobile" }), React.createElement("div", null, "iPhone6")), React.createElement("div", { className: classNames({
                    'phone': true,
                    'active': this.props.setting.data.fitInWeb === 'mobile' && this.props.setting.data.viewportWidth === 828 / 2.5 && this.props.setting.data.viewportHeight === 1472 / 2.5
                }), onClick: this.handleChangeMobileSize.bind(this, 828 / 2.5, 1472 / 2.5) }, React.createElement("i", { className: "fa fa-mobile" }), React.createElement("div", null, "iPhone7")))), React.createElement("div", { className: desktopClasses, onClick: this.changeFitInWeb.bind(this, 'pc') }, React.createElement("i", { className: "fa fa-desktop" })));
        }
    }]);
    return Size;
}(React.Component);
Size.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], Size.prototype, "changeFitInWeb", null);
__decorate([index_1.autoBindMethod], Size.prototype, "handleChangeMobileSize", null);
Size = __decorate([mobx_react_1.inject('setting', 'application', 'viewport'), mobx_react_1.observer], Size);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Size;