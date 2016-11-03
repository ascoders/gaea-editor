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
var ReactDOM = require("react-dom");
var typings = require("./components.type");
var mobx_react_1 = require("mobx-react");
var LZString = require("lz-string");
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-button');
var index_3 = require('nt-web-modal');
var Sortable = require("sortablejs");
var drag_source_component_1 = require("./drag-source.component");
require("./components.css");
var switchTypes = [{
    type: 'custom',
    name: '定制'
}, {
    type: 'base',
    name: '基础'
}, {
    type: 'group',
    name: '组合'
}];
var Components = function (_React$Component) {
    (0, _inherits3.default)(Components, _React$Component);

    function Components() {
        (0, _classCallCheck3.default)(this, Components);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Components.__proto__ || Object.getPrototypeOf(Components)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Components, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            Sortable.create(ReactDOM.findDOMNode(this.dragContainerInstance), {
                animation: 150,
                group: {
                    name: 'gaea-can-drag-in',
                    pull: 'clone',
                    put: false
                },
                sort: false,
                delay: 0,
                onStart: function onStart(event) {
                    _this2.lastDragStartIndex = event.oldIndex;
                    _this2.props.viewport.startDragging('', _this2.getUniqueKeyByIndex(event.oldIndex), true, null, event.oldIndex);
                },
                onEnd: function onEnd(event) {
                    _this2.props.viewport.endDragging();
                    if (event.clone.parentNode) {
                        _this2.dragContainerDomInstance.removeChild(event.clone);
                        if (_this2.lastDragStartIndex === _this2.dragContainerDomInstance.childNodes.length) {
                            _this2.dragContainerDomInstance.appendChild(event.item);
                        } else {
                            _this2.dragContainerDomInstance.insertBefore(event.item, _this2.dragContainerDomInstance.childNodes[_this2.lastDragStartIndex]);
                        }
                    } else {}
                }
            });
        }
    }, {
        key: "getUniqueKeyByIndex",
        value: function getUniqueKeyByIndex(index) {
            switch (this.state.selectedType) {
                case 'custom':
                    return this.props.application.customComponents[index].defaultProps.gaeaUniqueKey;
                case 'base':
                    return this.props.application.baseComponents[index].defaultProps.gaeaUniqueKey;
                case 'group':
                    return 'combo';
            }
        }
    }, {
        key: "setDragContainerInstance",
        value: function setDragContainerInstance(ref) {
            this.dragContainerInstance = ref;
            this.dragContainerDomInstance = ReactDOM.findDOMNode(ref);
        }
    }, {
        key: "handleChangeSelectedType",
        value: function handleChangeSelectedType(type) {
            this.setState({
                selectedType: type
            });
        }
    }, {
        key: "renderSwitchButtonGroup",
        value: function renderSwitchButtonGroup() {
            var _this3 = this;

            return switchTypes.map(function (item, index) {
                if (_this3.props.application.isHideCustomComponents && item.type === 'base') {
                    return null;
                }
                return React.createElement(index_2.Button, { type: "secondary", key: index, onClick: _this3.handleChangeSelectedType.bind(_this3, item.type), active: item.type === _this3.state.selectedType }, item.name);
            });
        }
    }, {
        key: "handleExport",
        value: function handleExport(component) {
            this.setState({
                exportComponentInfo: component,
                showExportModal: true
            });
        }
    }, {
        key: "handleCancelExportModal",
        value: function handleCancelExportModal() {
            this.setState({
                showExportModal: false
            });
        }
    }, {
        key: "renderDragComponents",
        value: function renderDragComponents() {
            var _this4 = this;

            switch (this.state.selectedType) {
                case 'custom':
                    return this.props.application.customComponents.map(function (item, index) {
                        return React.createElement(drag_source_component_1.default, { key: index }, React.createElement("i", { className: "fa fa-" + (item.defaultProps.gaeaIcon || 'cube') + " icons" }), item.defaultProps.gaeaName);
                    });
                case 'base':
                    return this.props.application.baseComponents.map(function (item, index) {
                        return React.createElement(drag_source_component_1.default, { key: index }, React.createElement("i", { className: "fa fa-" + (item.defaultProps.gaeaIcon || 'cube') + " icons gaea" }), item.defaultProps.gaeaName);
                    });
                case 'group':
                    return this.props.application.comboComponents.map(function (component, index) {
                        return React.createElement(drag_source_component_1.default, { key: index }, React.createElement("div", { className: "group-container" }, React.createElement("div", { className: "group-container-title" }, React.createElement("i", { className: "fa fa-cubes icons gaea" }), component.name), React.createElement("div", { className: "export", onClick: _this4.handleExport.bind(_this4, component) }, "导出")));
                    });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var SwitchButtonGroup = this.renderSwitchButtonGroup();
            var DragComponents = this.renderDragComponents();
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-sidebar_tools-tools-components components-container" }, React.createElement("div", { className: "container", ref: this.setDragContainerInstance }, DragComponents), React.createElement("div", { className: "switch" }, React.createElement(index_2.ButtonGroup, { className: "button-group", vertical: true }, SwitchButtonGroup)), React.createElement(index_3.Modal, { className: "nt-editor-gaea-editor-gaea_editor-page-sidebar_tools-tools-components", show: this.state.showExportModal, onCancel: this.handleCancelExportModal.bind(this), onOk: this.handleCancelExportModal.bind(this), title: this.state.exportComponentInfo && this.state.exportComponentInfo.name }, this.state.exportComponentInfo && React.createElement("div", null, React.createElement("textarea", { className: "export-textarea", onChange: function onChange() {}, value: LZString.compressToBase64(JSON.stringify(this.state.exportComponentInfo)) }), "复制输入框中的内容，并截图组件，发送给 huangziyi01@baidu.com，通过审核后您的组合会出现在左侧模板区域中（必须完全由基础组件组成）。")));
        }
    }]);
    return Components;
}(React.Component);
Components.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], Components.prototype, "getUniqueKeyByIndex", null);
__decorate([index_1.autoBindMethod], Components.prototype, "setDragContainerInstance", null);
__decorate([index_1.autoBindMethod], Components.prototype, "handleChangeSelectedType", null);
__decorate([index_1.autoBindMethod], Components.prototype, "renderSwitchButtonGroup", null);
__decorate([index_1.autoBindMethod], Components.prototype, "renderDragComponents", null);
Components = __decorate([mobx_react_1.inject('application', 'viewport'), mobx_react_1.observer], Components);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Components;