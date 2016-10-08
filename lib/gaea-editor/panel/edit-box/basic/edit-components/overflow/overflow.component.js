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
var typings = require('./overflow.type');
var mobx_react_1 = require('mobx-react');
var index_1 = require('nt-web-button');
var index_2 = require('nt-web-tooltip');
require('./overflow.css');
var EditComponentOverflow = function (_React$Component) {
    _inherits(EditComponentOverflow, _React$Component);

    function EditComponentOverflow() {
        var _ref;

        _classCallCheck(this, EditComponentOverflow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = EditComponentOverflow.__proto__ || Object.getPrototypeOf(EditComponentOverflow)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(EditComponentOverflow, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
            this.init(this.props);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.init(nextProps);
        }
    }, {
        key: "isOverflowXYEqual",
        value: function isOverflowXYEqual() {
            return this.componentInfo.props.style.overflowX === this.componentInfo.props.style.overflowY || (this.componentInfo.props.style.overflowX === null || this.componentInfo.props.style.overflowX === 'auto') && (this.componentInfo.props.style.overflowY === null || this.componentInfo.props.style.overflowY === 'auto');
        }
    }, {
        key: "init",
        value: function init(props) {
            if (this.isOverflowXYEqual()) {
                this.setState({
                    expand: false
                });
            } else {
                this.setState({
                    expand: true
                });
            }
        }
    }, {
        key: "isStatu",
        value: function isStatu(statu) {
            var style = this.componentInfo.props.style;
            if ((style.overflow === null || style.overflow === 'auto') && (style.overflowX === null || style.overflowX === 'auto') && (style.overflowY === null || style.overflowY === 'auto')) {
                return statu === 'auto';
            }
            return style.overflow === statu && style.overflowX === null && style.overflowY === null || style.overflow === null && style.overflowX === statu && style.overflowY === statu;
        }
    }, {
        key: "handleUpdateCompressValue",
        value: function handleUpdateCompressValue(field, value) {
            this.props.viewport.prepareWriteHistory();
            this.props.viewport.updateComponentValueWithNoHistory(field, value);
            this.props.viewport.updateComponentValueWithNoHistory('style.overflowX', null);
            this.props.viewport.updateComponentValueWithNoHistory('style.overflowY', null);
            this.props.viewport.writeHistory();
        }
    }, {
        key: "handleUpdateExpandValue",
        value: function handleUpdateExpandValue(field, value) {
            this.props.viewport.prepareWriteHistory();
            this.props.viewport.updateComponentValueWithNoHistory(field, value);
            this.props.viewport.updateComponentValueWithNoHistory('style.overflow', null);
            this.props.viewport.writeHistory();
        }
    }, {
        key: "handleExpand",
        value: function handleExpand() {
            this.setState({
                expand: true
            });
        }
    }, {
        key: "handleCompress",
        value: function handleCompress() {
            this.setState({
                expand: false
            });
        }
    }, {
        key: "renderOverflow",
        value: function renderOverflow() {
            return React.createElement(index_1.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: "Auto" }, React.createElement(index_1.Button, { active: this.isStatu('auto'), onClick: this.handleUpdateCompressValue.bind(this, 'style.overflow', 'auto') }, "1")), React.createElement(index_2.Tooltip, { title: "Visible" }, React.createElement(index_1.Button, { active: this.isStatu('visible'), onClick: this.handleUpdateCompressValue.bind(this, 'style.overflow', 'visible') }, "2")), !this.props.application.isReactNative && React.createElement(index_2.Tooltip, { title: "Scroll" }, React.createElement(index_1.Button, { active: this.isStatu('scroll'), onClick: this.handleUpdateCompressValue.bind(this, 'style.overflow', 'scroll') }, "3")), React.createElement(index_2.Tooltip, { title: "Hidden" }, React.createElement(index_1.Button, { active: this.isStatu('hidden'), onClick: this.handleUpdateCompressValue.bind(this, 'style.overflow', 'hidden') }, "4")));
        }
    }, {
        key: "isExpandStatu",
        value: function isExpandStatu(field, statu) {
            var style = this.componentInfo.props.style;
            if (style[field] === null && style['overflow'] === statu) {
                return true;
            }
            if (style[field] === null && style['overflow'] === null) {
                return statu === 'auto';
            }
            return style[field] === statu;
        }
    }, {
        key: "renderOverflowExpand",
        value: function renderOverflowExpand() {
            return React.createElement("div", { className: "expand-container" }, React.createElement(index_1.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: "Auto" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowX', 'auto'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'auto') }, "1")), React.createElement(index_2.Tooltip, { title: "Visible" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowX', 'visible'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'visible') }, "2")), !this.props.application.isReactNative && React.createElement(index_2.Tooltip, { title: "Scroll" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowX', 'scroll'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'scroll') }, "3")), React.createElement(index_2.Tooltip, { title: "Hidden" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowX', 'hidden'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'hidden') }, "4"))), React.createElement(index_1.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: "Auto" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowY', 'auto'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'auto') }, "1")), React.createElement(index_2.Tooltip, { title: "Visible" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowY', 'visible'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'visible') }, "2")), !this.props.application.isReactNative && React.createElement(index_2.Tooltip, { title: "Scroll" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowY', 'scroll'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'scroll') }, "3")), React.createElement(index_2.Tooltip, { title: "Hidden" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowY', 'hidden'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'hidden') }, "4"))));
        }
    }, {
        key: "render",
        value: function render() {
            var canExpand = !this.state.expand;
            var canCompress = this.state.expand && this.isOverflowXYEqual();
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-edit_components-overflow" }, this.state.expand ? React.createElement("div", { className: "overflow-expend-label-container" }, React.createElement("div", { className: "label-item" }, "OverflowX"), React.createElement("div", { className: "label-item" }, "OverflowY")) : React.createElement("div", null, "Overflow"), React.createElement("div", { className: "overflow-expend-button-container" }, canExpand && React.createElement(index_1.Button, { onClick: this.handleExpand.bind(this) }, React.createElement("i", { className: "fa fa-expand" })), canCompress && React.createElement(index_1.Button, { onClick: this.handleCompress.bind(this) }, React.createElement("i", { className: "fa fa-compress" }))), React.createElement("div", { className: "operate-container" }, this.state.expand ? this.renderOverflowExpand() : this.renderOverflow()));
        }
    }]);

    return EditComponentOverflow;
}(React.Component);
EditComponentOverflow.defaultProps = new typings.Props();
EditComponentOverflow = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], EditComponentOverflow);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentOverflow;