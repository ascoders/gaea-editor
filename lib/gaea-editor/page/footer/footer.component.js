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
var typings = require("./footer.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-auto-bind');
require("./footer.css");
var Footer = function (_React$Component) {
    (0, _inherits3.default)(Footer, _React$Component);

    function Footer() {
        (0, _classCallCheck3.default)(this, Footer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Footer, [{
        key: "handleClick",
        value: function handleClick(mapUniqueKey) {
            this.props.viewport.setCurrentEditComponentMapUniqueKey(mapUniqueKey);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var childs = void 0;
            if (this.props.viewport.currentEditComponentMapUniqueKey) {
                var paths = this.props.viewport.findComponentPathFromRoot(this.props.viewport.currentEditComponentMapUniqueKey);
                paths.unshift(this.props.viewport.rootMapUniqueKey);
                childs = paths.map(function (mapUniqueKey, index) {
                    var componentInfo = _this2.props.viewport.components.get(mapUniqueKey);
                    return React.createElement("div", { onClick: _this2.handleClick.bind(_this2, mapUniqueKey), className: "footer-item", key: index }, componentInfo.props.gaeaName, React.createElement("div", { className: "right-icon-container" }, React.createElement("div", { className: "right-icon" })));
                });
            }
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-footer", style: { height: this.props.application.footerHeight } }, childs);
        }
    }]);
    return Footer;
}(React.Component);
Footer.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], Footer.prototype, "handleClick", null);
Footer = __decorate([mobx_react_1.inject('application', 'viewport'), mobx_react_1.observer], Footer);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Footer;