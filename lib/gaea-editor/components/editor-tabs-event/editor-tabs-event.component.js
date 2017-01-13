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
var typings = require("./editor-tabs-event.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-button');
var index_2 = require('nt-web-select');
var index_3 = require('nt-web-tooltip');
var jump_url_component_1 = require("./event-components/jump-url/jump-url.component");
var call_component_1 = require("./event-components/call/call.component");
var event_component_1 = require("./event-components/event/event.component");
var update_props_component_1 = require("./event-components/update-props/update-props.component");
var event_component_2 = require("./type-components/event/event.component");
var action_1 = require("./action");
var store_1 = require("./store");
require("./editor-tabs-event.css");
var EditorTabsEvent = function (_React$Component) {
    (0, _inherits3.default)(EditorTabsEvent, _React$Component);

    function EditorTabsEvent() {
        (0, _classCallCheck3.default)(this, EditorTabsEvent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditorTabsEvent.__proto__ || Object.getPrototypeOf(EditorTabsEvent)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditorTabsEvent, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            if (JSON.stringify(this.props.ViewportStore.currentEditComponentInfo.props.gaeaEventData) !== JSON.stringify(this.props.ViewportStore.currentEditComponentInfo.props.gaeaNativeEventData)) {
                this.setState({
                    isExpend: true
                });
            }
        }
    }, {
        key: "handleAddEvent",
        value: function handleAddEvent() {
            this.props.EditorEventAction.addEvent(this.props.ViewportStore.currentEditComponentMapUniqueKey, this.state.editType === 'web');
        }
    }, {
        key: "handleRemoveEvent",
        value: function handleRemoveEvent(index) {
            this.props.EditorEventAction.removeEvent(this.props.ViewportStore.currentEditComponentMapUniqueKey, index, this.state.editType === 'web');
        }
    }, {
        key: "handleChangeEventTriggerCondition",
        value: function handleChangeEventTriggerCondition(dataIndex, typeIndex) {
            this.props.EditorEventAction.updateEventTriggerCondition(this.props.ViewportStore.currentEditComponentMapUniqueKey, dataIndex, typeIndex, this.state.editType === 'web');
        }
    }, {
        key: "handleChangeEventAction",
        value: function handleChangeEventAction(dataIndex, eventIndex) {
            this.props.EditorEventAction.updateEventAction(this.props.ViewportStore.currentEditComponentMapUniqueKey, dataIndex, eventIndex, this.state.editType === 'web');
        }
    }, {
        key: "handleExpand",
        value: function handleExpand() {
            this.setState({
                isExpend: true
            });
            this.props.EditorEventAction.copyEventToNative(this.props.ViewportStore.currentEditComponentMapUniqueKey);
        }
    }, {
        key: "handleCompress",
        value: function handleCompress() {
            this.setState({
                isExpend: false,
                editType: 'web'
            });
            this.props.EditorEventAction.removeNativeEvent(this.props.ViewportStore.currentEditComponentMapUniqueKey);
        }
    }, {
        key: "changeEditType",
        value: function changeEditType(type) {
            this.setState({
                editType: type
            });
        }
    }, {
        key: "canExpend",
        value: function canExpend() {
            if (!this.state.isExpend) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "canCompress",
        value: function canCompress() {
            if (this.state.isExpend) {
                return JSON.stringify(this.props.ViewportStore.currentEditComponentInfo.props.gaeaEventData) === JSON.stringify(this.props.ViewportStore.currentEditComponentInfo.props.gaeaNativeEventData);
            } else {
                return false;
            }
        }
    }, {
        key: "renderEventEditor",
        value: function renderEventEditor(eventData) {
            var _this2 = this;

            var typeOptions = this.props.ViewportStore.currentEditComponentInfo.props.gaeaEvent && this.props.ViewportStore.currentEditComponentInfo.props.gaeaEvent.triggers ? this.props.ViewportStore.currentEditComponentInfo.props.gaeaEvent.triggers.map(function (trigger, index) {
                return {
                    key: index.toString(),
                    value: trigger.name
                };
            }) : [];
            typeOptions.unshift({
                key: 'listen',
                value: '监听事件'
            });
            typeOptions.unshift({
                key: 'init',
                value: '初始化'
            });
            var eventOptions = this.props.ViewportStore.currentEditComponentInfo.props.gaeaEvent && this.props.ViewportStore.currentEditComponentInfo.props.gaeaEvent.effects ? this.props.ViewportStore.currentEditComponentInfo.props.gaeaEvent.effects.map(function (effect, index) {
                return {
                    key: index.toString(),
                    value: effect.name
                };
            }) : [];
            eventOptions.unshift({
                key: 'call',
                value: '命令（端功能）'
            });
            eventOptions.unshift({
                key: 'updateProps',
                value: '修改属性'
            });
            eventOptions.unshift({
                key: 'emit',
                value: '触发事件'
            });
            eventOptions.unshift({
                key: 'none',
                value: '无'
            });
            return eventData.map(function (data, index) {
                var TypeEditor = void 0;
                switch (data.type) {
                    case 'listen':
                        TypeEditor = React.createElement(event_component_2.default, { index: index, isWeb: _this2.state.editType === 'web' });
                        break;
                }
                var ActionEditor = void 0;
                switch (data.event) {
                    case 'jumpUrl':
                        ActionEditor = React.createElement(jump_url_component_1.default, { index: index, isWeb: _this2.state.editType === 'web' });
                        break;
                    case 'call':
                        ActionEditor = React.createElement(call_component_1.default, { index: index, isWeb: _this2.state.editType === 'web' });
                        break;
                    case 'emit':
                        ActionEditor = React.createElement(event_component_1.default, { index: index, isWeb: _this2.state.editType === 'web' });
                        break;
                    case 'updateProps':
                        ActionEditor = React.createElement(update_props_component_1.default, { index: index, isWeb: _this2.state.editType === 'web' });
                        break;
                }
                return React.createElement("div", { key: _this2.props.ViewportStore.currentEditComponentMapUniqueKey + '_' + index, className: "event-item-container" }, React.createElement("div", { className: "event-choose-container" }, React.createElement("div", { className: "event-label" }, React.createElement(index_2.Select, { label: "触发条件", value: data.typeIndex > -1 ? data.typeIndex.toString() : data.type, onChange: _this2.handleChangeEventTriggerCondition.bind(_this2, index), options: typeOptions })), React.createElement("div", { className: "event-effect" }, React.createElement(index_2.Select, { label: "动作", value: data.eventIndex > -1 ? data.eventIndex.toString() : data.event, onChange: _this2.handleChangeEventAction.bind(_this2, index), options: eventOptions })), React.createElement("div", { className: "close-container", onClick: _this2.handleRemoveEvent.bind(_this2, index) }, React.createElement("i", { className: "fa fa-close" }))), React.createElement("div", { className: "event-editor-container" }, TypeEditor, ActionEditor));
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.ViewportStore.currentEditComponentMapUniqueKey === null || !this.props.ViewportStore.currentEditComponentInfo) {
                return null;
            }
            var Events = this.state.editType === 'web' ? this.renderEventEditor(this.props.ViewportStore.currentEditComponentInfo.props.gaeaEventData) : this.renderEventEditor(this.props.ViewportStore.currentEditComponentInfo.props.gaeaNativeEventData);
            var notEmpty = this.state.editType === 'web' ? this.props.ViewportStore.currentEditComponentInfo.props.gaeaEventData.length > 0 : this.props.ViewportStore.currentEditComponentInfo.props.gaeaNativeEventData.length > 0;
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-editor_tabs_event", key: this.props.ViewportStore.currentEditComponentMapUniqueKey }, notEmpty && React.createElement("div", { className: "event-container" }, Events), React.createElement("div", { className: "bottom-operate-container" }, React.createElement(index_1.Button, { className: "new-event-button", onClick: this.handleAddEvent.bind(this) }, "新建事件"), this.props.ApplicationStore.editorProps.isReactNative && React.createElement("div", { className: "expend-button-container" }, this.canExpend() && React.createElement(index_3.Tooltip, { title: "分别配置 web 与 native 的事件" }, React.createElement(index_1.Button, { onClick: this.handleExpand.bind(this) }, React.createElement("i", { className: "fa fa-expand" }))), this.state.isExpend && React.createElement(index_1.ButtonGroup, null, this.canCompress() && React.createElement(index_3.Tooltip, { title: "统一编辑事件" }, React.createElement(index_1.Button, { onClick: this.handleCompress.bind(this) }, React.createElement("i", { className: "fa fa-compress" }))), React.createElement(index_3.Tooltip, { title: "只在web生效的事件" }, React.createElement(index_1.Button, { active: this.state.editType === 'web', onClick: this.changeEditType.bind(this, 'web') }, "web")), React.createElement(index_3.Tooltip, { title: "只在native生效的事件" }, React.createElement(index_1.Button, { active: this.state.editType === 'native', onClick: this.changeEditType.bind(this, 'native') }, "native"))))));
        }
    }]);
    return EditorTabsEvent;
}(React.Component);
EditorTabsEvent.defaultProps = new typings.Props();
EditorTabsEvent.position = 'editorEvent';
EditorTabsEvent.Action = action_1.default;
EditorTabsEvent.Store = store_1.default;
EditorTabsEvent = __decorate([EditorManager.observer(['ViewportStore', 'EditorEventStore', 'EditorEventAction', 'ApplicationStore'])], EditorTabsEvent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorTabsEvent;