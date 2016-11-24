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
var typings = require("./preview.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-auto-bind');
require("./preview.css");
var Preview = function (_React$Component) {
    (0, _inherits3.default)(Preview, _React$Component);

    function Preview() {
        (0, _classCallCheck3.default)(this, Preview);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Preview.__proto__ || Object.getPrototypeOf(Preview)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Preview, [{
        key: "handlePreview",
        value: function handlePreview() {
            if (!this.props.ApplicationStore.inPreview) {
                this.props.ViewportAction.clean();
            }
            this.props.ApplicationAction.setPreview(!this.props.ApplicationStore.inPreview);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { onClick: this.handlePreview }, this.props.ApplicationStore.inPreview ? '取消预览' : '预览');
        }
    }]);
    return Preview;
}(React.Component);
Preview.defaultProps = new typings.Props();
Preview.position = 'navbarRight';
__decorate([index_1.autoBindMethod], Preview.prototype, "handlePreview", null);
Preview = __decorate([EditorManager.observer(['ApplicationStore', 'ApplicationAction', 'ViewportAction'])], Preview);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Preview;