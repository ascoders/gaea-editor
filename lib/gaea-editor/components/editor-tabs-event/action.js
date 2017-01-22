"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

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
var gaea_editor_manager_1 = require("../../../gaea-editor-manager/gaea-editor-manager");

var EditorEventAction = function () {
    function EditorEventAction() {
        (0, _classCallCheck3.default)(this, EditorEventAction);

        this.observeClass = true;
    }

    (0, _createClass3.default)(EditorEventAction, [{
        key: "addEvent",
        value: function addEvent(mapUniqueKey, isWeb) {
            var componentInfo = this.viewport.components.get(mapUniqueKey);
            var eventData = {
                type: 'init',
                event: 'none',
                typeIndex: -1,
                eventIndex: -1
            };
            if (isWeb) {
                componentInfo.props.gaeaEventData.push(eventData);
            } else {
                componentInfo.props.gaeaNativeEventData.push(eventData);
            }
        }
    }, {
        key: "removeEvent",
        value: function removeEvent(mapUniqueKey, index, isWeb) {
            var componentInfo = this.viewport.components.get(mapUniqueKey);
            if (isWeb) {
                componentInfo.props.gaeaEventData.splice(index, 1);
            } else {
                componentInfo.props.gaeaNativeEventData.splice(index, 1);
            }
        }
    }, {
        key: "updateEventTriggerCondition",
        value: function updateEventTriggerCondition(mapUniqueKey, dataIndex, typeIndex, isWeb) {
            var componentInfo = this.viewport.components.get(mapUniqueKey);
            var eventDataName = isWeb ? 'gaeaEventData' : 'gaeaNativeEventData';
            if (isNaN(Number(typeIndex))) {
                gaea_editor_manager_1.transaction(function () {
                    _.set(componentInfo.props, eventDataName + "." + dataIndex + ".type", typeIndex);
                    _.set(componentInfo.props, eventDataName + "." + dataIndex + ".typeIndex", -1);
                });
                switch (typeIndex) {
                    case 'listen':
                        _.set(componentInfo.props, eventDataName + "." + dataIndex + ".typeData", gaea_editor_manager_1.observable({
                            listen: ''
                        }));
                        break;
                }
                return;
            }
            var eventType = componentInfo.props.gaeaEvent.triggers[Number(typeIndex)];
            gaea_editor_manager_1.transaction(function () {
                _.set(componentInfo.props, eventDataName + "." + dataIndex + ".type", eventType.type);
                _.set(componentInfo.props, eventDataName + "." + dataIndex + ".typeIndex", Number(typeIndex));
            });
        }
    }, {
        key: "updateEventAction",
        value: function updateEventAction(mapUniqueKey, dataIndex, eventIndex, isWeb) {
            var componentInfo = this.viewport.components.get(mapUniqueKey);
            var eventDataName = isWeb ? 'gaeaEventData' : 'gaeaNativeEventData';
            if (isNaN(Number(eventIndex))) {
                gaea_editor_manager_1.transaction(function () {
                    _.set(componentInfo.props, eventDataName + "." + dataIndex + ".event", eventIndex);
                    _.set(componentInfo.props, eventDataName + "." + dataIndex + ".eventIndex", -1);
                });
                switch (eventIndex) {
                    case 'emit':
                        _.set(componentInfo.props, eventDataName + "." + dataIndex + ".eventData", gaea_editor_manager_1.observable({
                            emit: ''
                        }));
                        break;
                }
                return;
            }
            var eventAction = componentInfo.props.gaeaEvent.effects[Number(eventIndex)];
            gaea_editor_manager_1.transaction(function () {
                _.set(componentInfo.props, eventDataName + "." + dataIndex + ".event", eventAction.type);
                _.set(componentInfo.props, eventDataName + "." + dataIndex + ".eventIndex", Number(eventIndex));
            });

            (function () {
                switch (eventAction.type) {
                    case 'jumpUrl':
                        _.set(componentInfo.props, eventDataName + "." + dataIndex + ".eventData", gaea_editor_manager_1.observable({
                            url: ''
                        }));
                        break;
                    case 'call':
                        var fields = {};
                        eventAction.call.param && eventAction.call.param.forEach(function (param) {
                            fields[param.field] = null;
                        });
                        _.set(componentInfo.props, eventDataName + "." + dataIndex + ".eventData", gaea_editor_manager_1.observable(fields));
                        break;
                }
            })();
        }
    }, {
        key: "updateEventData",
        value: function updateEventData(mapUniqueKey, field, value) {
            var componentInfo = this.viewport.components.get(mapUniqueKey);
            _.set(componentInfo.props, field, value);
        }
    }, {
        key: "getEventListName",
        value: function getEventListName() {
            var eventList = [];
            this.viewport.components.forEach(function (component) {
                component.props.gaeaEventData.forEach(function (eventData) {
                    if (eventData.event === 'emit') {
                        eventList.push(eventData.eventData.emit);
                    }
                });
            });
            return eventList;
        }
    }, {
        key: "copyEventToNative",
        value: function copyEventToNative(mapUniqueKey) {
            var componentInfo = this.viewport.components.get(mapUniqueKey);
            componentInfo.props.gaeaNativeEventData = gaea_editor_manager_1.observable(JSON.parse(JSON.stringify(componentInfo.props.gaeaEventData)));
        }
    }, {
        key: "removeNativeEvent",
        value: function removeNativeEvent(mapUniqueKey) {
            var componentInfo = this.viewport.components.get(mapUniqueKey);
            componentInfo.props.gaeaNativeEventData = gaea_editor_manager_1.observable([]);
        }
    }, {
        key: "setCurrentEditPropsIndex",
        value: function setCurrentEditPropsIndex(index, eventProps, currentEditIsWeb, eventIndex) {
            var componentInfo = this.viewport.components.get(this.viewport.currentEditComponentMapUniqueKey);
            var componentProps = null;
            if (index !== null) {
                this.eventStore.currentEditIsWeb = currentEditIsWeb;
                this.eventStore.currentEditEventIndex = eventIndex;
                if (this.eventStore.currentEditPropsIndex === null) {
                    this.eventStore.temporaryOriginProps = this.applicationAction.cleanComponentProps(componentInfo.props);
                }
                componentProps = gaea_editor_manager_1.extendObservable({}, this.viewportAction.completionEditProps(this.applicationAction.expendComponentProps(eventProps)));
            } else {
                componentProps = gaea_editor_manager_1.extendObservable({}, this.viewportAction.completionEditProps(this.applicationAction.expendComponentProps(this.eventStore.temporaryOriginProps)));
                this.eventStore.temporaryOriginProps = null;
            }
            this.eventStore.currentEditPropsIndex = index;
            componentProps && Object.keys(componentProps).forEach(function (key) {
                if (!_.startsWith(key, 'gaea')) {
                    componentInfo.props[key] = componentProps[key];
                }
            });
        }
    }]);
    return EditorEventAction;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorEventAction;
__decorate([gaea_editor_manager_1.inject('EditorEventStore')], EditorEventAction.prototype, "eventStore", void 0);
__decorate([gaea_editor_manager_1.inject('ViewportStore')], EditorEventAction.prototype, "viewport", void 0);
__decorate([gaea_editor_manager_1.inject('ApplicationAction')], EditorEventAction.prototype, "applicationAction", void 0);
__decorate([gaea_editor_manager_1.inject('ViewportAction')], EditorEventAction.prototype, "viewportAction", void 0);
__decorate([gaea_editor_manager_1.observable], EditorEventAction.prototype, "observeClass", void 0);
__decorate([gaea_editor_manager_1.action('新增一个事件')], EditorEventAction.prototype, "addEvent", null);
__decorate([gaea_editor_manager_1.action('删除一个事件')], EditorEventAction.prototype, "removeEvent", null);
__decorate([gaea_editor_manager_1.action('更新事件触发条件')], EditorEventAction.prototype, "updateEventTriggerCondition", null);
__decorate([gaea_editor_manager_1.action('更新事件触发动作')], EditorEventAction.prototype, "updateEventAction", null);
__decorate([gaea_editor_manager_1.action('更新事件数据')], EditorEventAction.prototype, "updateEventData", null);
__decorate([gaea_editor_manager_1.action('获取所有 event 事件名列表')], EditorEventAction.prototype, "getEventListName", null);
__decorate([gaea_editor_manager_1.action('将事件配置复制一份给 native')], EditorEventAction.prototype, "copyEventToNative", null);
__decorate([gaea_editor_manager_1.action('删除 native 的事件配置')], EditorEventAction.prototype, "removeNativeEvent", null);
__decorate([gaea_editor_manager_1.action('设置当前编辑是第几个属性')], EditorEventAction.prototype, "setCurrentEditPropsIndex", null);