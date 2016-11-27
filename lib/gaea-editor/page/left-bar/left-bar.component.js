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
var typings = require("./left-bar.type");
var mobx_react_1 = require("mobx-react");
var _ = require("lodash");
require("./left-bar.css");
var LeftBar = function (_React$Component) {
    (0, _inherits3.default)(LeftBar, _React$Component);

    function LeftBar() {
        (0, _classCallCheck3.default)(this, LeftBar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (LeftBar.__proto__ || Object.getPrototypeOf(LeftBar)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(LeftBar, [{
        key: "render",
        value: function render() {
            if (this.props.ApplicationStore.leftBarType === null) {
                return null;
            }
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-left_bar" }, this.props.ApplicationAction.loadingPluginByPosition('leftBar' + _.upperFirst(this.props.ApplicationStore.leftBarType)));
        }
    }]);
    return LeftBar;
}(React.Component);
LeftBar.defaultProps = new typings.Props();
LeftBar = __decorate([mobx_react_1.observer(['ApplicationStore', 'ApplicationAction'])], LeftBar);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LeftBar;