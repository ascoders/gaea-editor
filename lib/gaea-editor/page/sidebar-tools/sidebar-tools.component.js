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
var typings = require('./sidebar-tools.type');
var mobx_react_1 = require('mobx-react');
var classNames = require('classnames');
var tools_component_1 = require('./tools/tools.component');
var tree_component_1 = require('./tree/tree.component');
require('./sidebar-tools.css');
var SidebarTools = function (_React$Component) {
    _inherits(SidebarTools, _React$Component);

    function SidebarTools() {
        var _ref;

        _classCallCheck(this, SidebarTools);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = SidebarTools.__proto__ || Object.getPrototypeOf(SidebarTools)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(SidebarTools, [{
        key: "render",
        value: function render() {
            var classes = classNames({
                'nt-editor-gaea-editor-gaea_editor-page-sidebar_tools': true
            });
            var style = {
                transform: this.props.application.isPreview ? "translate3d(" + this.props.application.sidebarWidth + "px, 0, 0)" : 'translate3d(0, 0, 0)',
                width: this.props.application.sidebarWidth
            };
            return React.createElement("div", { style: style, className: classes }, React.createElement(tools_component_1.default, null), React.createElement(tree_component_1.default, null));
        }
    }]);

    return SidebarTools;
}(React.Component);
SidebarTools.defaultProps = new typings.Props();
SidebarTools = __decorate([mobx_react_1.inject('application'), mobx_react_1.observer], SidebarTools);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SidebarTools;