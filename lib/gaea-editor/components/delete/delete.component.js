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
var typings = require("./delete.type");
var keymaster = require("keymaster");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-auto-bind');
require("./delete.css");
var Delete = function (_React$Component) {
    (0, _inherits3.default)(Delete, _React$Component);

    function Delete() {
        (0, _classCallCheck3.default)(this, Delete);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Delete.__proto__ || Object.getPrototypeOf(Delete)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Delete, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            keymaster('delete, backspace', this.removeComponent);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            keymaster.unbind('delete, backspace');
        }
    }, {
        key: "removeComponent",
        value: function removeComponent() {
            if (this.props.ApplicationStore.inPreview || !this.props.ViewportStore.currentHoverComponentMapUniqueKey) {
                return;
            }
            if (this.props.ViewportStore.currentHoverComponentMapUniqueKey === this.props.ViewportStore.rootMapUniqueKey) {
                return;
            }
            this.props.ViewportAction.removeComponent(this.props.ViewportStore.currentHoverComponentMapUniqueKey);
        }
    }, {
        key: "render",
        value: function render() {
            return null;
        }
    }]);
    return Delete;
}(React.Component);
Delete.defaultProps = new typings.Props();
Delete.position = 'navbarRight';
__decorate([index_1.autoBindMethod], Delete.prototype, "removeComponent", null);
Delete = __decorate([EditorManager.observer(['ApplicationStore', 'ViewportStore', 'ViewportAction'])], Delete);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Delete;