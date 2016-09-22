"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var typings = require('./viewport-sidebar-resize.type');
var mobx_react_1 = require('mobx-react');
var _ = require('lodash');
require('./viewport-sidebar-resize.css');
var ViewportSidebarResize = function (_React$Component) {
    _inherits(ViewportSidebarResize, _React$Component);

    function ViewportSidebarResize() {
        var _ref;

        _classCallCheck(this, ViewportSidebarResize);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = ViewportSidebarResize.__proto__ || Object.getPrototypeOf(ViewportSidebarResize)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(ViewportSidebarResize, [{
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
//# sourceMappingURL=viewport-sidebar-resize.component.js.map