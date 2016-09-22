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
var typings = require('./left-bar.type');
var mobx_react_1 = require('mobx-react');
var classNames = require('classnames');
require('./left-bar.css');
var template_component_1 = require('./template/template.component');
var SidebarAddon = function (_React$Component) {
    _inherits(SidebarAddon, _React$Component);

    function SidebarAddon() {
        var _ref;

        _classCallCheck(this, SidebarAddon);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = SidebarAddon.__proto__ || Object.getPrototypeOf(SidebarAddon)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(SidebarAddon, [{
        key: "toggleShowLayoutBorder",
        value: function toggleShowLayoutBorder() {
            this.props.viewport.setShowLayoutBorder(!this.props.viewport.showLayoutBorder);
        }
    }, {
        key: "toggleShowTemplate",
        value: function toggleShowTemplate() {
            if (!this.props.viewport.isShowLeftBar) {
                this.props.viewport.showLeftBar('template');
            } else {
                this.props.viewport.hideLeftBar();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var templateClasses = classNames({
                'menu-item': true,
                'active': this.props.viewport.isShowLeftBar
            });
            var showLayoutClasses = classNames({
                'menu-item': true,
                'active': this.props.viewport.isMovingComponent || this.props.viewport.showLayoutBorder
            });
            var extendClasses = classNames({
                'extend-container': true,
                'show': this.props.viewport.isShowLeftBar
            });
            var templateChildren = null;
            switch (this.props.viewport.leftBarType) {
                case 'template':
                    templateChildren = React.createElement(template_component_1.default, null);
                    break;
            }
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-left_bar" }, React.createElement("div", { className: "container" }, React.createElement("div", { className: "top" }, React.createElement("div", { className: templateClasses, onClick: this.toggleShowTemplate.bind(this) }, React.createElement("i", { className: "fa fa-list-alt" }))), React.createElement("div", { className: "bottom" }, React.createElement("div", { className: showLayoutClasses, onClick: this.toggleShowLayoutBorder.bind(this) }, React.createElement("i", { className: "fa fa-eye" })))), React.createElement("div", { className: extendClasses }, templateChildren));
        }
    }]);

    return SidebarAddon;
}(React.Component);
SidebarAddon.defaultProps = new typings.Props();
SidebarAddon = __decorate([mobx_react_1.inject('application', 'viewport'), mobx_react_1.observer], SidebarAddon);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SidebarAddon;
//# sourceMappingURL=left-bar.component.js.map