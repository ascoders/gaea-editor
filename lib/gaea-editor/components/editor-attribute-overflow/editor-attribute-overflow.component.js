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
var typings = require("./editor-attribute-overflow.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-button');
var index_2 = require('nt-web-tooltip');
require("./editor-attribute-overflow.css");
var EditorAttributeOverflow = function (_React$Component) {
    (0, _inherits3.default)(EditorAttributeOverflow, _React$Component);

    function EditorAttributeOverflow() {
        (0, _classCallCheck3.default)(this, EditorAttributeOverflow);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditorAttributeOverflow.__proto__ || Object.getPrototypeOf(EditorAttributeOverflow)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditorAttributeOverflow, [{
        key: "isOverflowXYEqual",
        value: function isOverflowXYEqual() {
            return this.props.ViewportStore.currentEditComponentInfo.props.style.overflowX === this.props.ViewportStore.currentEditComponentInfo.props.style.overflowY || (this.props.ViewportStore.currentEditComponentInfo.props.style.overflowX === null || this.props.ViewportStore.currentEditComponentInfo.props.style.overflowX === 'auto') && (this.props.ViewportStore.currentEditComponentInfo.props.style.overflowY === null || this.props.ViewportStore.currentEditComponentInfo.props.style.overflowY === 'auto');
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
            var style = this.props.ViewportStore.currentEditComponentInfo.props.style;
            if (!this.props.ApplicationStore.editorProps.isReactNative) {
                if ((style.overflow === null || style.overflow === 'auto') && (style.overflowX === null || style.overflowX === 'auto') && (style.overflowY === null || style.overflowY === 'auto')) {
                    return statu === 'auto';
                }
                return style.overflow === statu && style.overflowX === null && style.overflowY === null || style.overflow === null && style.overflowX === statu && style.overflowY === statu;
            }
            if (style.overflow === null || style.overflow === 'auto') {
                return statu === 'auto';
            }
            return style.overflow === statu;
        }
    }, {
        key: "handleUpdateCompressValue",
        value: function handleUpdateCompressValue(field, value) {
            this.props.ViewportAction.updateCurrentEditComponentProps(field, value);
            if (!this.props.ApplicationStore.editorProps.isReactNative) {
                this.props.ViewportAction.updateCurrentEditComponentProps('style.overflowX', null);
                this.props.ViewportAction.updateCurrentEditComponentProps('style.overflowY', null);
            }
        }
    }, {
        key: "handleUpdateExpandValue",
        value: function handleUpdateExpandValue(field, value) {
            this.props.ViewportAction.updateCurrentEditComponentProps(field, value);
            this.props.ViewportAction.updateCurrentEditComponentProps('style.overflow', null);
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
            return React.createElement(index_1.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: "Auto" }, React.createElement(index_1.Button, { active: this.isStatu('auto'), onClick: this.handleUpdateCompressValue.bind(this, 'style.overflow', 'auto') }, "1")), React.createElement(index_2.Tooltip, { title: "Visible" }, React.createElement(index_1.Button, { active: this.isStatu('visible'), onClick: this.handleUpdateCompressValue.bind(this, 'style.overflow', 'visible') }, "2")), !this.props.ApplicationStore.editorProps.isReactNative && React.createElement(index_2.Tooltip, { title: "Scroll" }, React.createElement(index_1.Button, { active: this.isStatu('scroll'), onClick: this.handleUpdateCompressValue.bind(this, 'style.overflow', 'scroll') }, "3")), React.createElement(index_2.Tooltip, { title: "Hidden" }, React.createElement(index_1.Button, { active: this.isStatu('hidden'), onClick: this.handleUpdateCompressValue.bind(this, 'style.overflow', 'hidden') }, "4")));
        }
    }, {
        key: "isExpandStatu",
        value: function isExpandStatu(field, statu) {
            var style = this.props.ViewportStore.currentEditComponentInfo.props.style;
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
            return React.createElement("div", { className: "expand-container" }, React.createElement(index_1.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: "Auto" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowX', 'auto'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'auto') }, "1")), React.createElement(index_2.Tooltip, { title: "Visible" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowX', 'visible'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'visible') }, "2")), !this.props.ApplicationStore.editorProps.isReactNative && React.createElement(index_2.Tooltip, { title: "Scroll" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowX', 'scroll'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'scroll') }, "3")), React.createElement(index_2.Tooltip, { title: "Hidden" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowX', 'hidden'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowX', 'hidden') }, "4"))), React.createElement(index_1.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: "Auto" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowY', 'auto'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'auto') }, "1")), React.createElement(index_2.Tooltip, { title: "Visible" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowY', 'visible'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'visible') }, "2")), !this.props.ApplicationStore.editorProps.isReactNative && React.createElement(index_2.Tooltip, { title: "Scroll" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowY', 'scroll'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'scroll') }, "3")), React.createElement(index_2.Tooltip, { title: "Hidden" }, React.createElement(index_1.Button, { active: this.isExpandStatu('overflowY', 'hidden'), onClick: this.handleUpdateExpandValue.bind(this, 'style.overflowY', 'hidden') }, "4"))));
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.ViewportStore.currentEditComponentMapUniqueKey === null) {
                return null;
            }
            var canExpand = !this.state.expand;
            var canCompress = this.state.expand && this.isOverflowXYEqual();
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-editor_attribute_overflow" }, this.state.expand ? React.createElement("div", { className: "overflow-expend-label-container" }, React.createElement("div", { className: "label-item" }, "OverflowX"), React.createElement("div", { className: "label-item" }, "OverflowY")) : React.createElement("div", null, "Overflow"), !this.props.ApplicationStore.editorProps.isReactNative && React.createElement("div", { className: "overflow-expend-button-container" }, canExpand && React.createElement(index_1.Button, { onClick: this.handleExpand.bind(this) }, React.createElement("i", { className: "fa fa-expand" })), canCompress && React.createElement(index_1.Button, { onClick: this.handleCompress.bind(this) }, React.createElement("i", { className: "fa fa-compress" }))), React.createElement("div", { className: "operate-container" }, this.state.expand ? this.renderOverflowExpand() : this.renderOverflow()));
        }
    }]);
    return EditorAttributeOverflow;
}(React.Component);
EditorAttributeOverflow.defaultProps = new typings.Props();
EditorAttributeOverflow.position = 'editorAttributeOverflow';
EditorAttributeOverflow = __decorate([EditorManager.observer(['ViewportStore', 'ApplicationStore', 'ViewportAction'])], EditorAttributeOverflow);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorAttributeOverflow;