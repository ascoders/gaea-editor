"use strict";

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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
var index_1 = require('inject-instance');
var mobx_1 = require("mobx");
var Sortable = require("sortablejs");
var _ = require("lodash");
var LZString = require("lz-string");

var ViewportAction = function () {
    function ViewportAction() {
        (0, _classCallCheck3.default)(this, ViewportAction);

        this.observableClass = true;
    }

    (0, _createClass3.default)(ViewportAction, [{
        key: "setRootMapUniqueKey",
        value: function setRootMapUniqueKey(mapUniqueKey) {
            this.viewport.rootMapUniqueKey = mapUniqueKey;
        }
    }, {
        key: "setViewportDom",
        value: function setViewportDom(dom) {
            this.viewport.viewportDom = dom;
        }
    }, {
        key: "setComponent",
        value: function setComponent(mapUniqueKey, componentInfo) {
            var componentInfoClone = _.cloneDeep(componentInfo);
            componentInfoClone.props = this.completionEditProps(componentInfo.props);
            if (componentInfoClone.parentMapUniqueKey === null) {
                componentInfoClone.props.gaeaEdit = componentInfoClone.props.gaeaEdit.filter(function (edit) {
                    return edit.editor !== 'position' && edit !== '定位';
                });
            }
            componentInfoClone.props = mobx_1.extendObservable({}, componentInfoClone.props);
            this.viewport.components.set(mapUniqueKey, componentInfoClone);
        }
    }, {
        key: "addNewComponent",
        value: function addNewComponent(uniqueKey, parentMapUniqueKey, index) {
            var mapUniqueKey = this.createUniqueKey();
            var ComponentClass = this.applicationAction.getComponentClassByGaeaUniqueKey(uniqueKey);
            var newProps = _.cloneDeep(ComponentClass.defaultProps);
            var component = {
                props: newProps,
                parentMapUniqueKey: parentMapUniqueKey
            };
            if (ComponentClass.defaultProps.canDragIn) {
                component.layoutChilds = [];
            }
            this.setComponent(mapUniqueKey, component);
            this.viewport.components.get(parentMapUniqueKey).layoutChilds.splice(index, 0, mapUniqueKey);
            return mapUniqueKey;
        }
    }, {
        key: "moveComponent",
        value: function moveComponent(sourceMapUniqueKey, sourceIndex, targetMapUniqueKey, targetIndex) {
            var sourceComponentInfo = this.viewport.components.get(sourceMapUniqueKey);
            var targetComponentInfo = this.viewport.components.get(targetMapUniqueKey);
            var moveComponentMapUniqueKey = sourceComponentInfo.layoutChilds[sourceIndex];
            var moveComponentInfo = this.viewport.components.get(moveComponentMapUniqueKey);
            moveComponentInfo.parentMapUniqueKey = targetMapUniqueKey;
            targetComponentInfo.layoutChilds.splice(targetIndex, 0, moveComponentMapUniqueKey);
            sourceComponentInfo.layoutChilds.splice(sourceIndex, 1);
        }
    }, {
        key: "horizontalMoveComponent",
        value: function horizontalMoveComponent(parentMapUniqueKey, beforeIndex, afterIndex) {
            var layoutChilds = this.viewport.components.get(parentMapUniqueKey).layoutChilds;
            if (beforeIndex < afterIndex) {
                mobx_1.transaction(function () {
                    for (var index = beforeIndex; index < afterIndex; index++) {
                        var beforeUniqueKey = layoutChilds[index];
                        var afterUniqueKey = layoutChilds[index + 1];
                        layoutChilds[index] = afterUniqueKey;
                        layoutChilds[index + 1] = beforeUniqueKey;
                    }
                });
            } else {
                mobx_1.transaction(function () {
                    for (var index = beforeIndex; index > afterIndex; index--) {
                        var beforeUniqueKey = layoutChilds[index];
                        var afterUniqueKey = layoutChilds[index - 1];
                        layoutChilds[index] = afterUniqueKey;
                        layoutChilds[index - 1] = beforeUniqueKey;
                    }
                });
            }
        }
    }, {
        key: "addComboComponent",
        value: function addComboComponent(parentMapUniqueKey, componentFullInfo, index) {
            var _this = this;

            Object.keys(componentFullInfo.childs).forEach(function (childMapUniqueKey) {
                var expendComponentInfo = _this.applicationAction.expendComponent(JSON.parse(JSON.stringify(componentFullInfo.childs[childMapUniqueKey])));
                var component = {
                    props: mobx_1.extendObservable({}, expendComponentInfo.props),
                    parentMapUniqueKey: expendComponentInfo.parentMapUniqueKey
                };
                if (expendComponentInfo.props.canDragIn) {
                    component.layoutChilds = expendComponentInfo.layoutChilds || [];
                }
                _this.setComponent(childMapUniqueKey, component);
            });
            var expendRootComponentInfo = this.applicationAction.expendComponent(JSON.parse(JSON.stringify(componentFullInfo.componentInfo)));
            var rootComponent = {
                props: mobx_1.extendObservable({}, expendRootComponentInfo.props),
                parentMapUniqueKey: expendRootComponentInfo.parentMapUniqueKey
            };
            if (expendRootComponentInfo.props.canDragIn) {
                rootComponent.layoutChilds = expendRootComponentInfo.layoutChilds || [];
            }
            this.setComponent(componentFullInfo.mapUniqueKey, rootComponent);
            this.addToParent(componentFullInfo.mapUniqueKey, parentMapUniqueKey, index);
        }
    }, {
        key: "addComboComponentBySource",
        value: function addComboComponentBySource(parentMapUniqueKey, componentFullInfoSource, index) {
            var _this2 = this;

            var componentFullInfo = JSON.parse(LZString.decompressFromBase64(componentFullInfoSource));
            var componentFullInfoCopy = this.createCopyComponentWithNewUniqueKey(componentFullInfo, parentMapUniqueKey);
            componentFullInfoCopy.componentInfo = this.applicationAction.expendComponent(componentFullInfoCopy.componentInfo);
            Object.keys(componentFullInfoCopy.childs).forEach(function (childKey) {
                componentFullInfoCopy.childs[childKey] = _this2.applicationAction.expendComponent(componentFullInfoCopy.childs[childKey]);
            });
            this.addComboComponent(parentMapUniqueKey, componentFullInfoCopy, index);
        }
    }, {
        key: "removeComponent",
        value: function removeComponent(mapUniqueKey) {
            var _this3 = this;

            var removeComponentInfo = this.viewport.components.get(mapUniqueKey);
            if (removeComponentInfo.parentMapUniqueKey === null) {
                throw '不能删除根节点';
            }
            mobx_1.transaction(function () {
                var childMapUniqueKeys = _this3.getAllChildsByMapUniqueKey(mapUniqueKey);
                childMapUniqueKeys.forEach(function (childMapUniqueKey) {
                    _this3.viewport.components.delete(childMapUniqueKey);
                });
                var parentComponentInfo = _this3.viewport.components.get(removeComponentInfo.parentMapUniqueKey);
                parentComponentInfo.layoutChilds = parentComponentInfo.layoutChilds.filter(function (childMapUniqueKey) {
                    return childMapUniqueKey !== mapUniqueKey;
                });
                _this3.viewport.components.delete(mapUniqueKey);
                if (mapUniqueKey === _this3.viewport.currentEditComponentMapUniqueKey) {
                    _this3.setCurrentEditComponentMapUniqueKey(null);
                }
                if (mapUniqueKey === _this3.viewport.currentHoverComponentMapUniqueKey) {
                    _this3.setCurrentHoverComponentMapUniqueKey(null);
                }
            });
        }
    }, {
        key: "setCurrentHoverComponentMapUniqueKey",
        value: function setCurrentHoverComponentMapUniqueKey(mapUniqueKey) {
            this.viewport.currentHoverComponentMapUniqueKey = mapUniqueKey;
        }
    }, {
        key: "setCurrentEditComponentMapUniqueKey",
        value: function setCurrentEditComponentMapUniqueKey(mapUniqueKey) {
            var _this4 = this;

            this.viewport.currentEditComponentMapUniqueKey = mapUniqueKey;
            setTimeout(function () {
                _this4.viewport.showEditComponents = !!mapUniqueKey;
            }, 150);
        }
    }, {
        key: "createUniqueKey",
        value: function createUniqueKey() {
            return _.uniqueId('gaea-component-' + new Date().getTime() + '-');
        }
    }, {
        key: "setDomInstance",
        value: function setDomInstance(mapUniqueKey, dom) {
            this.viewport.componentDomInstances.set(mapUniqueKey, dom);
        }
    }, {
        key: "removeDomInstance",
        value: function removeDomInstance(mapUniqueKey) {
            this.viewport.componentDomInstances.delete(mapUniqueKey);
        }
    }, {
        key: "startDrag",
        value: function startDrag(dragInfo) {
            this.viewport.currentDragComponentInfo = dragInfo;
        }
    }, {
        key: "endDrag",
        value: function endDrag() {
            this.viewport.currentDragComponentInfo = null;
        }
    }, {
        key: "setDragTargetInfo",
        value: function setDragTargetInfo(mapUniqueKey, index) {
            this.viewport.currentDragComponentInfo.viewportInfo.targetMapUniqueKey = mapUniqueKey;
            this.viewport.currentDragComponentInfo.viewportInfo.targetIndex = index;
        }
    }, {
        key: "setLayoutComponentActive",
        value: function setLayoutComponentActive(active) {
            this.viewport.isLayoutComponentActive = active;
        }
    }, {
        key: "updateCurrentEditComponentProps",
        value: function updateCurrentEditComponentProps(field, value) {
            this.updateComponentProps(this.viewport.currentEditComponentMapUniqueKey, field, value);
        }
    }, {
        key: "updateComponentProps",
        value: function updateComponentProps(mapUniqueKey, field, value) {
            var componentInfo = this.viewport.components.get(mapUniqueKey);
            _.set(componentInfo.props, field, value);
        }
    }, {
        key: "resetProps",
        value: function resetProps(mapUniqueKey) {
            var componentInfo = this.viewport.components.get(mapUniqueKey);
            var ComponentClass = this.applicationAction.getComponentClassByGaeaUniqueKey(componentInfo.props.gaeaUniqueKey);
            componentInfo.props = mobx_1.extendObservable({}, _.cloneDeep(ComponentClass.defaultProps));
        }
    }, {
        key: "clean",
        value: function clean() {
            var _this5 = this;

            mobx_1.transaction(function () {
                _this5.viewport.currentEditComponentMapUniqueKey = null;
                _this5.viewport.currentHoverComponentMapUniqueKey = null;
                _this5.viewport.currentDragComponentInfo = null;
                _this5.viewport.showEditComponents = false;
            });
        }
    }, {
        key: "addToParent",
        value: function addToParent(mapUniqueKey, parentMapUniqueKey, index) {
            this.viewport.components.get(mapUniqueKey).parentMapUniqueKey = parentMapUniqueKey;
            this.viewport.components.get(parentMapUniqueKey).layoutChilds.splice(index, 0, mapUniqueKey);
        }
    }, {
        key: "completionEditProps",
        value: function completionEditProps(componentProps) {
            if (!componentProps.gaeaEventData) {
                componentProps.gaeaEventData = [];
            }
            if (!componentProps.gaeaNativeEventData) {
                componentProps.gaeaNativeEventData = [];
            }
            if (!componentProps.gaeaVariables) {
                componentProps.gaeaVariables = {};
            }
            return componentProps;
        }
    }, {
        key: "registerInnerDrag",
        value: function registerInnerDrag(mapUniqueKey, dragParentElement) {
            var _this6 = this;

            var groupName = arguments.length <= 2 || arguments[2] === undefined ? 'gaea-can-drag-in' : arguments[2];
            var sortableParam = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

            var componentInfo = this.viewport.components.get(mapUniqueKey);
            Sortable.create(dragParentElement, (0, _extends3.default)({
                animation: 150,
                group: {
                    name: groupName,
                    pull: true,
                    put: true
                },
                onStart: function onStart(event) {
                    _this6.startDrag({
                        type: 'viewport',
                        dragStartParentElement: dragParentElement,
                        dragStartIndex: event.oldIndex,
                        viewportInfo: {
                            mapUniqueKey: componentInfo.layoutChilds[event.oldIndex]
                        }
                    });
                },
                onEnd: function onEnd(event) {
                    _this6.endDrag();
                    _this6.setCurrentHoverComponentMapUniqueKey(null);
                },
                onAdd: function onAdd(event) {
                    switch (_this6.viewport.currentDragComponentInfo.type) {
                        case 'new':
                            var newMapUniqueKey = _this6.addNewComponent(_this6.viewport.currentDragComponentInfo.newInfo.uniqueKey, mapUniqueKey, event.newIndex);
                            break;
                        case 'viewport':
                            if (_this6.viewport.currentDragComponentInfo.dragStartParentElement.childNodes.length === 0) {
                                _this6.viewport.currentDragComponentInfo.dragStartParentElement.appendChild(event.item);
                            } else if (_this6.viewport.currentDragComponentInfo.dragStartParentElement.childNodes.length === _this6.viewport.currentDragComponentInfo.dragStartIndex) {
                                _this6.viewport.currentDragComponentInfo.dragStartParentElement.appendChild(event.item);
                            } else {
                                _this6.viewport.currentDragComponentInfo.dragStartParentElement.insertBefore(event.item, _this6.viewport.currentDragComponentInfo.dragStartParentElement.childNodes[_this6.viewport.currentDragComponentInfo.dragStartIndex]);
                            }
                            _this6.setDragTargetInfo(mapUniqueKey, event.newIndex);
                            break;
                        case 'combo':
                            _this6.addComboComponentBySource(mapUniqueKey, _this6.viewport.currentDragComponentInfo.comboInfo.source, event.newIndex);
                            break;
                    }
                },
                onUpdate: function onUpdate(event) {
                    var oldIndex = event.oldIndex;
                    var newIndex = event.newIndex;
                    if (_this6.viewport.currentDragComponentInfo.dragStartParentElement.childNodes.length === oldIndex + 1) {
                        _this6.viewport.currentDragComponentInfo.dragStartParentElement.appendChild(event.item);
                    } else {
                        if (newIndex > oldIndex) {
                            _this6.viewport.currentDragComponentInfo.dragStartParentElement.insertBefore(event.item, _this6.viewport.currentDragComponentInfo.dragStartParentElement.childNodes[oldIndex]);
                        } else {
                            _this6.viewport.currentDragComponentInfo.dragStartParentElement.insertBefore(event.item, _this6.viewport.currentDragComponentInfo.dragStartParentElement.childNodes[oldIndex + 1]);
                        }
                    }
                    _this6.horizontalMoveComponent(mapUniqueKey, event.oldIndex, event.newIndex);
                },
                onRemove: function onRemove(event) {
                    _this6.moveComponent(mapUniqueKey, _this6.viewport.currentDragComponentInfo.dragStartIndex, _this6.viewport.currentDragComponentInfo.viewportInfo.targetMapUniqueKey, _this6.viewport.currentDragComponentInfo.viewportInfo.targetIndex);
                    _this6.eventAction.emit(_this6.event.viewportDomUpdate + "." + _this6.viewport.currentDragComponentInfo.viewportInfo.mapUniqueKey);
                }
            }, sortableParam));
        }
    }, {
        key: "registerOuterDrag",
        value: function registerOuterDrag(dragParentElement) {
            var _this7 = this;

            var groupName = arguments.length <= 1 || arguments[1] === undefined ? 'gaea-can-drag-in' : arguments[1];

            var lastDragStartIndex = -1;
            Sortable.create(dragParentElement, {
                animation: 150,
                group: {
                    name: groupName,
                    pull: 'clone',
                    put: false
                },
                sort: false,
                delay: 0,
                onStart: function onStart(event) {
                    lastDragStartIndex = event.oldIndex;
                    if (event.item.dataset.source) {
                        _this7.startDrag({
                            type: 'combo',
                            dragStartParentElement: dragParentElement,
                            dragStartIndex: event.oldIndex,
                            comboInfo: {
                                source: event.item.dataset.source
                            }
                        });
                    } else if (event.item.dataset.uniqueKey) {
                        _this7.startDrag({
                            type: 'new',
                            dragStartParentElement: dragParentElement,
                            dragStartIndex: event.oldIndex,
                            newInfo: {
                                uniqueKey: event.item.dataset.uniqueKey
                            }
                        });
                    }
                },
                onEnd: function onEnd(event) {
                    _this7.endDrag();
                    if (event.clone.parentNode) {
                        dragParentElement.removeChild(event.clone);
                        if (lastDragStartIndex === dragParentElement.childNodes.length) {
                            dragParentElement.appendChild(event.item);
                        } else {
                            dragParentElement.insertBefore(event.item, dragParentElement.childNodes[lastDragStartIndex]);
                        }
                    } else {}
                }
            });
        }
    }, {
        key: "getAllChildsByMapUniqueKey",
        value: function getAllChildsByMapUniqueKey(mapUniqueKey) {
            var _this8 = this;

            var componentInfo = this.viewport.components.get(mapUniqueKey);
            var childMapUniqueKeys = componentInfo.layoutChilds || [];
            componentInfo.layoutChilds && componentInfo.layoutChilds.forEach(function (childMapUniqueKey) {
                var childNestMapUniqueKeys = _this8.getAllChildsByMapUniqueKey(childMapUniqueKey);
                if (childNestMapUniqueKeys.length > 0) {
                    var _childMapUniqueKeys;

                    childMapUniqueKeys = (_childMapUniqueKeys = childMapUniqueKeys).concat.apply(_childMapUniqueKeys, (0, _toConsumableArray3.default)(childNestMapUniqueKeys));
                }
            });
            return childMapUniqueKeys;
        }
    }, {
        key: "getCurrentEditPropValueByEditInfo",
        value: function getCurrentEditPropValueByEditInfo(editInfo) {
            var value = _.get(this.viewport.currentEditComponentInfo.props, editInfo.field);
            if (value === null || value === undefined || value === editInfo.emptyValue) {
                return '';
            }
            return value.toString();
        }
    }, {
        key: "getIncrementComponentsInfo",
        value: function getIncrementComponentsInfo() {
            var _this9 = this;

            var cloneComponents = JSON.parse(JSON.stringify(this.viewport.components));
            Object.keys(cloneComponents).map(function (key) {
                cloneComponents[key] = _this9.applicationAction.cleanComponent(cloneComponents[key]);
            });
            return LZString.compressToBase64(JSON.stringify(cloneComponents));
        }
    }, {
        key: "getComponentFullInfoByMapUniqueKey",
        value: function getComponentFullInfoByMapUniqueKey(mapUniqueKey) {
            var _this10 = this;

            var componentInfo = this.viewport.components.get(mapUniqueKey);
            var childs = {};
            var mapChilds = function mapChilds(component, childs) {
                if (component.props.canDragIn && component.layoutChilds) {
                    JSON.parse(JSON.stringify(component.layoutChilds)).forEach(function (componentMapUniqueKey) {
                        var childInfo = _this10.viewport.components.get(componentMapUniqueKey);
                        childs[componentMapUniqueKey] = JSON.parse(JSON.stringify(childInfo));
                        mapChilds(childInfo, childs);
                    });
                }
            };
            mapChilds(componentInfo, childs);
            return {
                mapUniqueKey: mapUniqueKey,
                componentInfo: JSON.parse(JSON.stringify(componentInfo)),
                childs: childs
            };
        }
    }, {
        key: "createCopyComponentWithNewUniqueKey",
        value: function createCopyComponentWithNewUniqueKey(originComponent, parentMapUniqueKey) {
            var _this11 = this;

            var uniqueKeyMap = new Map();
            uniqueKeyMap.set(originComponent.mapUniqueKey, this.createUniqueKey());
            originComponent.childs && Object.keys(originComponent.childs).forEach(function (childMapUniqueKey) {
                uniqueKeyMap.set(childMapUniqueKey, _this11.createUniqueKey());
            });
            var childs = {};
            Object.keys(originComponent.childs).forEach(function (mapUniqueKey) {
                var originChild = originComponent.childs[mapUniqueKey];
                childs[uniqueKeyMap.get(mapUniqueKey)] = {
                    parentMapUniqueKey: uniqueKeyMap.get(originChild.parentMapUniqueKey),
                    props: JSON.parse(JSON.stringify(originChild.props))
                };
                if (originChild.layoutChilds) {
                    childs[uniqueKeyMap.get(mapUniqueKey)].layoutChilds = originChild.layoutChilds.map(function (childMapUniqueKey) {
                        return uniqueKeyMap.get(childMapUniqueKey);
                    });
                }
            });
            var newCopyComponent = {
                mapUniqueKey: uniqueKeyMap.get(originComponent.mapUniqueKey),
                componentInfo: {
                    parentMapUniqueKey: parentMapUniqueKey,
                    props: JSON.parse(JSON.stringify(originComponent.componentInfo.props))
                },
                childs: childs
            };
            if (originComponent.componentInfo.layoutChilds) {
                newCopyComponent.componentInfo.layoutChilds = originComponent.componentInfo.layoutChilds.map(function (childMapUniqueKey) {
                    return uniqueKeyMap.get(childMapUniqueKey);
                });
            }
            return newCopyComponent;
        }
    }]);
    return ViewportAction;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewportAction;
__decorate([index_1.inject('ViewportStore')], ViewportAction.prototype, "viewport", void 0);
__decorate([index_1.inject('ApplicationAction')], ViewportAction.prototype, "applicationAction", void 0);
__decorate([index_1.inject('EventAction')], ViewportAction.prototype, "eventAction", void 0);
__decorate([index_1.inject('EventStore')], ViewportAction.prototype, "event", void 0);
__decorate([mobx_1.observable], ViewportAction.prototype, "observableClass", void 0);
__decorate([mobx_1.action('设置根节点唯一标识')], ViewportAction.prototype, "setRootMapUniqueKey", null);
__decorate([mobx_1.action('设置视图区域 dom 节点')], ViewportAction.prototype, "setViewportDom", null);
__decorate([mobx_1.action('在视图中设置组件信息')], ViewportAction.prototype, "setComponent", null);
__decorate([mobx_1.action('新增全新的组件')], ViewportAction.prototype, "addNewComponent", null);
__decorate([mobx_1.action('移动组件')], ViewportAction.prototype, "moveComponent", null);
__decorate([mobx_1.action('组件在同父级移动位置')], ViewportAction.prototype, "horizontalMoveComponent", null);
__decorate([mobx_1.action('新增模板组件')], ViewportAction.prototype, "addComboComponent", null);
__decorate([mobx_1.action('新增模板组件，源码是压缩后的')], ViewportAction.prototype, "addComboComponentBySource", null);
__decorate([mobx_1.action('移除组件')], ViewportAction.prototype, "removeComponent", null);
__decorate([mobx_1.action('设置当前 hover 元素的 mapUniqueKey')], ViewportAction.prototype, "setCurrentHoverComponentMapUniqueKey", null);
__decorate([mobx_1.action('设置当前 edit 元素的 mapUniqueKey')], ViewportAction.prototype, "setCurrentEditComponentMapUniqueKey", null);
__decorate([mobx_1.action('生成唯一 key')], ViewportAction.prototype, "createUniqueKey", null);
__decorate([mobx_1.action('设置视图 dom 实例')], ViewportAction.prototype, "setDomInstance", null);
__decorate([mobx_1.action('移除一个视图 dom 实例')], ViewportAction.prototype, "removeDomInstance", null);
__decorate([mobx_1.action('开始拖拽')], ViewportAction.prototype, "startDrag", null);
__decorate([mobx_1.action('结束拖拽')], ViewportAction.prototype, "endDrag", null);
__decorate([mobx_1.action('从视图中移动到新父级时，设置拖拽目标（父级）的信息')], ViewportAction.prototype, "setDragTargetInfo", null);
__decorate([mobx_1.action('设置布局元素是否高亮')], ViewportAction.prototype, "setLayoutComponentActive", null);
__decorate([mobx_1.action('修改当前编辑组件的组件属性')], ViewportAction.prototype, "updateCurrentEditComponentProps", null);
__decorate([mobx_1.action('修改组件属性')], ViewportAction.prototype, "updateComponentProps", null);
__decorate([mobx_1.action('重置属性')], ViewportAction.prototype, "resetProps", null);
__decorate([mobx_1.action('清空当前状态')], ViewportAction.prototype, "clean", null);
__decorate([mobx_1.action('添加一个已存在的 component 到它的父级')], ViewportAction.prototype, "addToParent", null);