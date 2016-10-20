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
var typings = require("./viewport-sidebar-resize.type");
var mobx_react_1 = require("mobx-react");
var _ = require("lodash");
require("./viewport-sidebar-resize.css");
var ViewportSidebarResize = function (_React$Component) {
    (0, _inherits3.default)(ViewportSidebarResize, _React$Component);

    function ViewportSidebarResize() {
        (0, _classCallCheck3.default)(this, ViewportSidebarResize);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ViewportSidebarResize.__proto__ || Object.getPrototypeOf(ViewportSidebarResize)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(ViewportSidebarResize, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
            document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !_.isEqual(this.state, nextState);
        }
    }, {
        key: "handleMouseMove",
        value: function handleMouseMove(event) {
            if (!this.props.application.isSidebarMoving) return;
            this.props.application.setSidebarWidth(this.props.application.sidebarWidth - event.movementX);
        }
    }, {
        key: "handleMouseDown",
        value: function handleMouseDown() {
            this.props.application.setSidebarMoving(true);
        }
    }, {
        key: "handleMouseUp",
        value: function handleMouseUp() {
            this.props.application.setSidebarMoving(false);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-viewport_sidebar_resize", onMouseDown: this.handleMouseDown.bind(this) });
        }
    }]);
    return ViewportSidebarResize;
}(React.Component);
ViewportSidebarResize.defaultProps = new typings.Props();
ViewportSidebarResize = __decorate([mobx_react_1.inject('application'), mobx_react_1.observer], ViewportSidebarResize);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewportSidebarResize;