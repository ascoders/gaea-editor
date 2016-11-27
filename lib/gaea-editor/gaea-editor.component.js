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
var typings = require("./gaea-editor.type");
var mobx_react_1 = require("mobx-react");
var provider_1 = require("./utils/provider");
var page_component_1 = require("./page/page.component");
require("./gaea-editor.css");
var GaeaEditor = function (_React$Component) {
    (0, _inherits3.default)(GaeaEditor, _React$Component);

    function GaeaEditor() {
        (0, _classCallCheck3.default)(this, GaeaEditor);

        var _this = (0, _possibleConstructorReturn3.default)(this, (GaeaEditor.__proto__ || Object.getPrototypeOf(GaeaEditor)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(GaeaEditor, [{
        key: "render",
        value: function render() {
            return React.createElement(provider_1.default, { gaeaProps: this.props }, React.createElement(page_component_1.default, null));
        }
    }]);
    return GaeaEditor;
}(React.Component);
GaeaEditor.defaultProps = new typings.Props();
GaeaEditor = __decorate([mobx_react_1.observer], GaeaEditor);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GaeaEditor;