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
var typings = require("./editor-attribute-layout.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-button');
var index_2 = require('nt-web-tooltip');
var index_3 = require('nt-web-checkbox');
var index_4 = require('nt-web-number');
require("./editor-attribute-layout.css");
var EditorAttributeLayout = function (_React$Component) {
    (0, _inherits3.default)(EditorAttributeLayout, _React$Component);

    function EditorAttributeLayout() {
        (0, _classCallCheck3.default)(this, EditorAttributeLayout);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditorAttributeLayout.__proto__ || Object.getPrototypeOf(EditorAttributeLayout)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditorAttributeLayout, [{
        key: "handleUpdateValue",
        value: function handleUpdateValue(field, value) {
            this.props.ViewportAction.updateCurrentEditComponentProps(field, value);
        }
    }, {
        key: "handleChangeReverse",
        value: function handleChangeReverse(checked) {
            switch (this.props.ViewportStore.currentEditComponentInfo.props.style.flexDirection) {
                case 'row':
                    this.handleUpdateValue('style.flexDirection', 'row-reverse');
                    break;
                case 'row-reverse':
                    this.handleUpdateValue('style.flexDirection', 'row');
                    break;
                case 'column':
                    this.handleUpdateValue('style.flexDirection', 'column-reverse');
                    break;
                case 'column-reverse':
                    this.handleUpdateValue('style.flexDirection', 'column');
                    break;
            }
        }
    }, {
        key: "handleFlexGrowChange",
        value: function handleFlexGrowChange(value) {
            var intValue = value === '' ? null : parseInt(value);
            if (this.props.ApplicationStore.editorProps.isReactNative) {
                this.handleUpdateValue('style.flex', intValue);
            } else {
                this.handleUpdateValue('style.flexGrow', intValue);
            }
        }
    }, {
        key: "renderFlex",
        value: function renderFlex() {
            var isReverse = false;
            switch (this.props.ViewportStore.currentEditComponentInfo.props.style.flexDirection) {
                case 'row':
                    isReverse = false;
                    break;
                case 'row-reverse':
                    isReverse = true;
                    break;
                case 'column':
                    isReverse = false;
                    break;
                case 'column-reverse':
                    isReverse = true;
                    break;
            }
            var isRow = this.props.ViewportStore.currentEditComponentInfo.props.style.flexDirection === 'row' || this.props.ViewportStore.currentEditComponentInfo.props.style.flexDirection === 'row-reverse';
            var flexGrowString = '';
            if (this.props.ApplicationStore.editorProps.isReactNative) {
                flexGrowString = this.props.ViewportStore.currentEditComponentInfo.props.style.flex ? this.props.ViewportStore.currentEditComponentInfo.props.style.flex.toString() : '';
            } else {
                flexGrowString = this.props.ViewportStore.currentEditComponentInfo.props.style.flexGrow ? this.props.ViewportStore.currentEditComponentInfo.props.style.flexGrow.toString() : '';
            }
            var rowStart = !isReverse ? '左' : '右';
            var columnStart = !isReverse ? '上' : '下';
            var rowEnd = !isReverse ? '右' : '左';
            var columnEnd = !isReverse ? '下' : '上';
            var firstLineDirection = isRow ? '水平' : '竖直';
            var secondLineDirection = isRow ? '竖直' : '水平';
            var rowFlexStart = firstLineDirection + "方向靠" + (isRow ? rowStart : columnStart);
            var rowFlexCenter = firstLineDirection + "方向居中";
            var rowFlexEnd = firstLineDirection + "方向靠" + (isRow ? rowEnd : columnEnd);
            var rowFlexSpaceBetween = firstLineDirection + "方向等间距排列";
            var rowFlexSpaceAround = firstLineDirection + "方向等间距排列, 两侧留一半空间";
            var columnFlexStart = secondLineDirection + "方向靠" + (isRow ? '上' : '左');
            var columnFlexCenter = secondLineDirection + "方向居中";
            var columnFlexEnd = secondLineDirection + "方向靠" + (isRow ? '下' : '右');
            var columnFlexStrech = secondLineDirection + "方向拉伸";
            var columnFlexBaseline = secondLineDirection + "方向baseline";
            return React.createElement("div", null, React.createElement("div", { className: "layout-top-container", style: { marginTop: 5 } }, React.createElement(index_2.Tooltip, { title: "Direction:Row" }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.flexDirection === 'row' || this.props.ViewportStore.currentEditComponentInfo.props.style.flexDirection === 'row-reverse', onClick: this.handleUpdateValue.bind(this, 'style.flexDirection', 'row') }, React.createElement("svg", { className: "svg-icon rotate-180" }, React.createElement("use", { xlinkHref: "#flex-row" })))), React.createElement(index_1.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: rowFlexStart }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.justifyContent === 'flex-start', onClick: this.handleUpdateValue.bind(this, 'style.justifyContent', 'flex-start') }, React.createElement("svg", { className: "svg-icon rotate-180" }, React.createElement("use", { xlinkHref: "#flex-direction-end" })))), React.createElement(index_2.Tooltip, { title: rowFlexCenter }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.justifyContent === 'center', onClick: this.handleUpdateValue.bind(this, 'style.justifyContent', 'center') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#flex-direction-center" })))), React.createElement(index_2.Tooltip, { title: rowFlexEnd }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.justifyContent === 'flex-end', onClick: this.handleUpdateValue.bind(this, 'style.justifyContent', 'flex-end') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#flex-direction-end" })))), React.createElement(index_2.Tooltip, { title: rowFlexSpaceBetween }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.justifyContent === 'space-between', onClick: this.handleUpdateValue.bind(this, 'style.justifyContent', 'space-between') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#flex-space-between" })))), React.createElement(index_2.Tooltip, { title: rowFlexSpaceAround }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.justifyContent === 'space-around', onClick: this.handleUpdateValue.bind(this, 'style.justifyContent', 'space-around') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#flex-space-around" })))))), React.createElement("div", { className: "layout-top-container", style: { marginTop: 5 } }, React.createElement(index_2.Tooltip, { title: "Direction:Column" }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.flexDirection === 'column' || this.props.ViewportStore.currentEditComponentInfo.props.style.flexDirection === 'column-reverse', onClick: this.handleUpdateValue.bind(this, 'style.flexDirection', 'column') }, React.createElement("svg", { className: "svg-icon rotate-270" }, React.createElement("use", { xlinkHref: "#flex-row" })))), React.createElement(index_1.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: columnFlexStart }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.alignItems === 'flex-start', onClick: this.handleUpdateValue.bind(this, 'style.alignItems', 'flex-start') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#flex-align-start" })))), React.createElement(index_2.Tooltip, { title: columnFlexCenter }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.alignItems === 'center', onClick: this.handleUpdateValue.bind(this, 'style.alignItems', 'center') }, "C")), React.createElement(index_2.Tooltip, { title: columnFlexEnd }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.alignItems === 'flex-end', onClick: this.handleUpdateValue.bind(this, 'style.alignItems', 'flex-end') }, React.createElement("svg", { className: "svg-icon rotate-180" }, React.createElement("use", { xlinkHref: "#flex-align-start" })))), React.createElement(index_2.Tooltip, { title: columnFlexStrech }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.alignItems === 'stretch', onClick: this.handleUpdateValue.bind(this, 'style.alignItems', 'stretch') }, "B")), React.createElement(index_2.Tooltip, { title: columnFlexBaseline }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.alignItems === 'baseline', onClick: this.handleUpdateValue.bind(this, 'style.alignItems', 'baseline') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#flex-baseline" })))))), React.createElement("div", { className: "second-container" }, React.createElement(index_3.Checkbox, { checked: isReverse, onChange: this.handleChangeReverse.bind(this), style: { marginTop: 5, flexGrow: 1, width: 0 } }, "逆序"), React.createElement("div", { className: "second-container-flex-grow-container" }, React.createElement("span", null, "Grow"), React.createElement(index_4.Number, { label: "", onChange: this.handleFlexGrowChange.bind(this), value: flexGrowString }))));
        }
    }, {
        key: "renderDisplay",
        value: function renderDisplay() {
            return React.createElement("div", { className: "layout-top-container" }, React.createElement(index_1.ButtonGroup, null, React.createElement(index_2.Tooltip, { title: "Block" }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.display === 'block', onClick: this.handleUpdateValue.bind(this, 'style.display', 'block') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#display-block" })))), React.createElement(index_2.Tooltip, { title: "InlineBlock" }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.display === 'inline-block', onClick: this.handleUpdateValue.bind(this, 'style.display', 'inline-block') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#display-inline-block" })))), React.createElement(index_2.Tooltip, { title: "Inline" }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.display === 'inline', onClick: this.handleUpdateValue.bind(this, 'style.display', 'inline') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#display-inline" }))))), React.createElement(index_2.Tooltip, { title: "Flex" }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.display === 'flex', onClick: this.handleUpdateValue.bind(this, 'style.display', 'flex') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#display-flex" })))), React.createElement(index_2.Tooltip, { title: "None" }, React.createElement(index_1.Button, { active: this.props.ViewportStore.currentEditComponentInfo.props.style.display === 'none', onClick: this.handleUpdateValue.bind(this, 'style.display', 'none') }, React.createElement("i", { className: "fa fa-eye-slash" }))));
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.ViewportStore.currentEditComponentMapUniqueKey === null) {
                return null;
            }
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-editor_attribute_layout" }, !this.props.ApplicationStore.editorProps.isReactNative && this.renderDisplay(), (this.props.ViewportStore.currentEditComponentInfo.props.style.display === 'flex' || this.props.ApplicationStore.editorProps.isReactNative) && this.renderFlex());
        }
    }]);
    return EditorAttributeLayout;
}(React.Component);
EditorAttributeLayout.defaultProps = new typings.Props();
EditorAttributeLayout.position = 'editorAttributeLayout';
EditorAttributeLayout = __decorate([EditorManager.observer(['ViewportStore', 'ApplicationStore', 'ViewportAction'])], EditorAttributeLayout);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorAttributeLayout;