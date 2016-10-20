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
var typings = require("./drag-source.type");
var mobx_react_1 = require("mobx-react");
require("./drag-source.css");
var DragSourceComponent = function (_React$Component) {
    (0, _inherits3.default)(DragSourceComponent, _React$Component);

    function DragSourceComponent() {
        (0, _classCallCheck3.default)(this, DragSourceComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DragSourceComponent.__proto__ || Object.getPrototypeOf(DragSourceComponent)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(DragSourceComponent, [{
        key: "handleMouseEnter",
        value: function handleMouseEnter() {}
    }, {
        key: "handleMouseLeave",
        value: function handleMouseLeave() {}
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-sidebar_tools-tools-components drag-box", onMouseEnter: this.handleMouseEnter.bind(this), onMouseLeave: this.handleMouseLeave.bind(this) }, this.props.children);
        }
    }]);
    return DragSourceComponent;
}(React.Component);
DragSourceComponent.defaultProps = new typings.Props();
DragSourceComponent = __decorate([mobx_react_1.observer], DragSourceComponent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DragSourceComponent;