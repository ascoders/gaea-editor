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
var typings = require("./event.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-button');
var index_2 = require('nt-web-select');
var jump_url_component_1 = require("./event-components/jump-url/jump-url.component");
var call_component_1 = require("./event-components/call/call.component");
var event_component_1 = require("./event-components/event/event.component");
var event_component_2 = require("./type-components/event/event.component");
require("./event.css");
var EditBoxEvent = function (_React$Component) {
    (0, _inherits3.default)(EditBoxEvent, _React$Component);

    function EditBoxEvent() {
        (0, _classCallCheck3.default)(this, EditBoxEvent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditBoxEvent.__proto__ || Object.getPrototypeOf(EditBoxEvent)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditBoxEvent, [{
        key: "handleAddEvent",
        value: function handleAddEvent() {
            this.props.viewport.prepareWriteHistory();
            this.props.viewport.addEvent(this.props.viewport.currentEditComponentMapUniqueKey);
            this.props.viewport.writeHistory();
        }
    }, {
        key: "handleRemoveEvent",
        value: function handleRemoveEvent(index) {
            this.props.viewport.prepareWriteHistory();
            this.props.viewport.removeEvent(this.props.viewport.currentEditComponentMapUniqueKey, index);
            this.props.viewport.writeHistory();
        }
    }, {
        key: "handleChangeEventTriggerCondition",
        value: function handleChangeEventTriggerCondition(dataIndex, typeIndex) {
            this.props.viewport.prepareWriteHistory();
            this.props.viewport.updateEventTriggerCondition(this.props.viewport.currentEditComponentMapUniqueKey, dataIndex, typeIndex);
            this.props.viewport.writeHistory();
        }
    }, {
        key: "handleChangeEventAction",
        value: function handleChangeEventAction(dataIndex, eventIndex) {
            this.props.viewport.prepareWriteHistory();
            this.props.viewport.updateEventAction(this.props.viewport.currentEditComponentMapUniqueKey, dataIndex, eventIndex);
            this.props.viewport.writeHistory();
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
            if (!this.componentInfo.props.gaeaEvent) {
                return null;
            }
            var typeOptions = this.componentInfo.props.gaeaEvent.types.map(function (type, index) {
                return {
                    key: index.toString(),
                    value: type.name
                };
            });
            typeOptions.unshift({
                key: 'listen',
                value: '监听事件'
            });
            typeOptions.unshift({
                key: 'init',
                value: '初始化'
            });
            var eventOptions = this.componentInfo.props.gaeaEvent.events.map(function (event, index) {
                return {
                    key: index.toString(),
                    value: event.name
                };
            });
            eventOptions.unshift({
                key: 'emit',
                value: '触发事件'
            });
            eventOptions.unshift({
                key: 'none',
                value: '无'
            });
            var Events = this.componentInfo.props.gaeaEventData.map(function (data, index) {
                var TypeEditor = void 0;
                switch (data.type) {
                    case 'listen':
                        TypeEditor = React.createElement(event_component_2.default, { index: index });
                        break;
                }
                var ActionEditor = void 0;
                switch (data.event) {
                    case 'jumpUrl':
                        ActionEditor = React.createElement(jump_url_component_1.default, { index: index });
                        break;
                    case 'call':
                        ActionEditor = React.createElement(call_component_1.default, { index: index });
                        break;
                    case 'emit':
                        ActionEditor = React.createElement(event_component_1.default, { index: index });
                        break;
                }
                return React.createElement("div", { key: index, className: "event-item-container" }, React.createElement("div", { className: "event-choose-container" }, React.createElement("div", { className: "event-label" }, React.createElement(index_2.Select, { label: "触发条件", value: data.typeIndex > -1 ? data.typeIndex.toString() : data.type, onChange: _this2.handleChangeEventTriggerCondition.bind(_this2, index), options: typeOptions })), React.createElement("div", { className: "event-effect" }, React.createElement(index_2.Select, { label: "动作", value: data.eventIndex > -1 ? data.eventIndex.toString() : data.event, onChange: _this2.handleChangeEventAction.bind(_this2, index), options: eventOptions })), React.createElement("div", { className: "close-container", onClick: _this2.handleRemoveEvent.bind(_this2, index) }, React.createElement("i", { className: "fa fa-close" }))), React.createElement("div", { className: "event-editor-container" }, TypeEditor, ActionEditor));
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-event" }, this.componentInfo.props.gaeaEventData.length > 0 && React.createElement("div", { className: "event-container" }, Events), React.createElement(index_1.Button, { className: "new-event-button", onClick: this.handleAddEvent.bind(this) }, "新建事件"));
        }
    }]);
    return EditBoxEvent;
}(React.Component);
EditBoxEvent.defaultProps = new typings.Props();
EditBoxEvent = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], EditBoxEvent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditBoxEvent;