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
var typings = require("./editor-tabs-attribute.type");
var _ = require("lodash");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-input');
var index_2 = require('nt-web-button');
var index_3 = require('nt-web-tooltip');
var index_4 = require('nt-auto-bind');
var to_template_component_1 = require("./to-template/to-template.component");
require("./editor-tabs-attribute.css");
var EditorTabsAttribute = function (_React$Component) {
    (0, _inherits3.default)(EditorTabsAttribute, _React$Component);

    function EditorTabsAttribute() {
        (0, _classCallCheck3.default)(this, EditorTabsAttribute);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditorTabsAttribute.__proto__ || Object.getPrototypeOf(EditorTabsAttribute)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditorTabsAttribute, [{
        key: "handleGaeaNameChange",
        value: function handleGaeaNameChange(value) {
            this.props.ViewportAction.updateCurrentEditComponentProps('gaeaName', value);
        }
    }, {
        key: "handleDelete",
        value: function handleDelete() {
            this.props.ViewportAction.removeComponent(this.props.ViewportStore.currentEditComponentMapUniqueKey);
        }
    }, {
        key: "handleReset",
        value: function handleReset() {
            this.props.ViewportAction.resetProps(this.props.ViewportStore.currentEditComponentMapUniqueKey);
        }
    }, {
        key: "handleConfirmEditPropsEvent",
        value: function handleConfirmEditPropsEvent() {
            var eventData = this.props.EditorEventStore.currentEditIsWeb ? 'gaeaEventData' : 'gaeaNativeEventData';
            var cleanProps = this.props.ApplicationAction.cleanComponentProps(this.props.ViewportStore.currentEditComponentInfo.props);
            this.props.ViewportAction.updateCurrentEditComponentProps(eventData + "." + this.props.EditorEventStore.currentEditEventIndex + ".eventData.props", cleanProps);
            this.props.EditorEventAction.setCurrentEditPropsIndex(null);
        }
    }, {
        key: "renderHeaderContainer",
        value: function renderHeaderContainer() {
            return React.createElement("div", { className: "header-container" }, React.createElement("div", { className: "header-container__icon-container" }, React.createElement("i", { className: "fa fa-" + this.props.ViewportStore.currentEditComponentInfo.props.gaeaIcon })), React.createElement("div", { className: "header-container__title-container" }, React.createElement(index_1.Input, { normal: true, label: "", onChange: this.handleGaeaNameChange, value: this.props.ViewportStore.currentEditComponentInfo.props.gaeaName })), React.createElement("div", { className: "header-container__operate-container" }, React.createElement(index_2.ButtonGroup, null, React.createElement(index_3.Tooltip, { title: "设置为模板" }, React.createElement(to_template_component_1.default, null)), this.props.ViewportStore.currentEditComponentInfo.parentMapUniqueKey !== null && React.createElement(index_3.Tooltip, { title: "重置属性" }, React.createElement(index_2.Button, { className: "child-scale", onClick: this.handleReset }, React.createElement("i", { className: "fa fa-refresh" }))), this.props.ViewportStore.currentEditComponentInfo.parentMapUniqueKey !== null && React.createElement(index_3.Tooltip, { title: "移除此元素" }, React.createElement(index_2.Button, { className: "child-scale", onClick: this.handleDelete }, React.createElement("i", { className: "fa fa-trash danger" }))))));
        }
    }, {
        key: "renderUpdateAttributeEvent",
        value: function renderUpdateAttributeEvent() {
            return React.createElement(index_2.Button, { type: "primary", style: { margin: 10 }, rounded: true, onClick: this.handleConfirmEditPropsEvent }, "确定");
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            if (this.props.ViewportStore.currentEditComponentMapUniqueKey === null || !this.props.ViewportStore.currentEditComponentInfo) {
                return null;
            }
            var EditItems = this.props.ViewportStore.currentEditComponentInfo.props.gaeaEdit && this.props.ViewportStore.currentEditComponentInfo.props.gaeaEdit.map(function (editInfo, index) {
                var key = _this2.props.ViewportStore.currentEditComponentMapUniqueKey + '_' + index;
                if (editInfo.constructor.name === 'String') {
                    return React.createElement("div", { key: key, className: "title" }, editInfo.toString());
                } else {
                    return React.createElement("div", { key: key }, _this2.props.ApplicationAction.loadingPluginByPosition("editorAttribute" + _.upperFirst(_.camelCase(editInfo.editor)), {
                        index: index,
                        editInfo: editInfo
                    }));
                }
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-editor_tabs_attribute" }, this.props.EditorEventStore.currentEditPropsIndex === null ? this.renderHeaderContainer() : this.renderUpdateAttributeEvent(), React.createElement("div", { className: "body-container" }, EditItems));
        }
    }]);
    return EditorTabsAttribute;
}(React.Component);
EditorTabsAttribute.defaultProps = new typings.Props();
EditorTabsAttribute.position = 'editorAttribute';
__decorate([index_4.autoBindMethod], EditorTabsAttribute.prototype, "handleGaeaNameChange", null);
__decorate([index_4.autoBindMethod], EditorTabsAttribute.prototype, "handleDelete", null);
__decorate([index_4.autoBindMethod], EditorTabsAttribute.prototype, "handleReset", null);
__decorate([index_4.autoBindMethod], EditorTabsAttribute.prototype, "handleConfirmEditPropsEvent", null);
EditorTabsAttribute = __decorate([EditorManager.observer(['ViewportStore', 'EditorEventStore', 'ViewportAction', 'ApplicationAction', 'EditorEventAction'])], EditorTabsAttribute);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorTabsAttribute;