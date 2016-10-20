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
var typings = require("./edit-helper.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-auto-bind');
var Sortable = require("sortablejs");
require("./edit-helper.css");
var hasClass = function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};
var removeClass = function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
};
var EditHelper_1 = function (_React$Component) {
    (0, _inherits3.default)(EditHelper, _React$Component);

    function EditHelper() {
        (0, _classCallCheck3.default)(this, EditHelper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditHelper.__proto__ || Object.getPrototypeOf(EditHelper)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditHelper, [{
        key: "componentWillReact",
        value: function componentWillReact() {
            this.setLayoutActive();
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.viewport.components.get(this.props.mapUniqueKey);
            this.SelfComponent = this.props.application.getComponentByUniqueKey(this.componentInfo.props.gaeaUniqueKey);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.selfDomInstance = ReactDOM.findDOMNode(this.selfInstance);
            this.selfDomInstance.addEventListener('mouseover', this.handleMouseOver);
            this.selfDomInstance.addEventListener('click', this.handleClick);
            this.selfDomInstance.className += ' nt-editor-gaea-editor-gaea_editor-page-viewport-edit_helper';
            this.setDraggingClass();
            this.setLayoutActive();
            if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout') {
                this.sortable = Sortable.create(this.selfDomInstance, {
                    animation: 150,
                    group: {
                        name: 'gaea-layout',
                        pull: true,
                        put: true
                    },
                    onStart: function onStart(event) {
                        _this2.props.viewport.startDragging(_this2.componentInfo.layoutChilds[event.oldIndex], '', false, _this2.selfDomInstance, event.oldIndex);
                    },
                    onEnd: function onEnd(event) {
                        _this2.props.viewport.endDragging();
                        _this2.props.viewport.setLeaveHover();
                        _this2.props.viewport.setTreeLeaveHover();
                    },
                    onAdd: function onAdd(event) {
                        var _props$viewport$addCo = _this2.props.viewport.addComponent(_this2.props.mapUniqueKey, event.newIndex);

                        var mapUniqueKey = _props$viewport$addCo.mapUniqueKey;
                        var component = _props$viewport$addCo.component;

                        if (_this2.props.viewport.currentMovingComponent.isNew) {
                            if (_this2.props.viewport.currentMovingComponent.uniqueKey === 'combo') {
                                _this2.props.viewport.saveOperate({
                                    type: 'addCombo',
                                    mapUniqueKey: mapUniqueKey,
                                    addCombo: {
                                        parentMapUniqueKey: _this2.props.mapUniqueKey,
                                        index: event.newIndex,
                                        componentInfo: component
                                    }
                                });
                            } else if (_this2.props.viewport.currentMovingComponent.uniqueKey === 'source') {
                                _this2.props.viewport.saveOperate({
                                    type: 'addSource',
                                    mapUniqueKey: mapUniqueKey,
                                    addSource: {
                                        parentMapUniqueKey: _this2.props.mapUniqueKey,
                                        index: event.newIndex,
                                        componentInfo: component
                                    }
                                });
                            } else {
                                _this2.props.viewport.saveOperate({
                                    type: 'add',
                                    mapUniqueKey: mapUniqueKey,
                                    add: {
                                        uniqueId: _this2.props.viewport.currentMovingComponent.uniqueKey,
                                        parentMapUniqueKey: _this2.props.mapUniqueKey,
                                        index: event.newIndex
                                    }
                                });
                            }
                        } else {
                            if (_this2.props.viewport.dragStartParentElement.childNodes.length === 0) {
                                _this2.props.viewport.dragStartParentElement.appendChild(event.item);
                            } else if (_this2.props.viewport.dragStartParentElement.childNodes.length === _this2.props.viewport.dragStartIndex) {
                                _this2.props.viewport.dragStartParentElement.appendChild(event.item);
                            } else {
                                _this2.props.viewport.dragStartParentElement.insertBefore(event.item, _this2.props.viewport.dragStartParentElement.childNodes[_this2.props.viewport.dragStartIndex]);
                            }
                            _this2.props.viewport.setDragTarget(_this2.props.mapUniqueKey, event.newIndex);
                        }
                    },
                    onUpdate: function onUpdate(event) {
                        var oldIndex = event.oldIndex;
                        var newIndex = event.newIndex;
                        if (_this2.props.viewport.dragStartParentElement.childNodes.length === oldIndex + 1) {
                            _this2.props.viewport.dragStartParentElement.appendChild(event.item);
                        } else {
                            if (newIndex > oldIndex) {
                                _this2.props.viewport.dragStartParentElement.insertBefore(event.item, _this2.props.viewport.dragStartParentElement.childNodes[oldIndex]);
                            } else {
                                _this2.props.viewport.dragStartParentElement.insertBefore(event.item, _this2.props.viewport.dragStartParentElement.childNodes[oldIndex + 1]);
                            }
                        }
                        _this2.props.viewport.sortComponents(_this2.props.mapUniqueKey, event.oldIndex, event.newIndex);
                        _this2.props.viewport.saveOperate({
                            type: 'exchange',
                            mapUniqueKey: _this2.props.mapUniqueKey,
                            exchange: {
                                oldIndex: oldIndex,
                                newIndex: newIndex
                            }
                        });
                    },
                    onRemove: function onRemove(event) {
                        _this2.componentInfo.layoutChilds.splice(event.oldIndex, 1);
                        _this2.props.viewport.saveOperate({
                            type: 'move',
                            mapUniqueKey: _this2.props.mapUniqueKey,
                            move: {
                                targetParentMapUniqueKey: _this2.props.viewport.dragTargetMapUniqueKey,
                                targetIndex: _this2.props.viewport.dragTargetIndex,
                                sourceParentMapUniqueKey: _this2.props.mapUniqueKey,
                                sourceIndex: event.oldIndex
                            }
                        });
                        _this2.props.viewport.setDragTarget(null, -1);
                    }
                });
            }
        }
    }, {
        key: "componentWillUpdate",
        value: function componentWillUpdate(nextProps, nextState) {
            this.setDraggingClass();
            this.setSelectStyle(nextState);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout') {}
            this.selfDomInstance.removeEventListener('mouseover', this.handleMouseOver);
            this.selfDomInstance.removeEventListener('click', this.handleClick);
        }
    }, {
        key: "setLayoutActive",
        value: function setLayoutActive() {
            if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.parentMapUniqueKey === null) {
                if (this.props.viewport.showLayoutBorder) {
                    if (!hasClass(this.selfDomInstance, 'gaea-layout-active')) {
                        this.selfDomInstance.className += ' gaea-layout-active';
                    }
                } else {
                    removeClass(this.selfDomInstance, 'gaea-layout-active');
                }
            }
        }
    }, {
        key: "setDraggingClass",
        value: function setDraggingClass() {
            if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.parentMapUniqueKey !== null) {
                if (!hasClass(this.selfDomInstance, 'gaea-layout')) {
                    this.selfDomInstance.className += ' gaea-layout';
                }
            }
        }
    }, {
        key: "setSelectStyle",
        value: function setSelectStyle(nextState) {
            if (nextState.selected) {
                if (!hasClass(this.selfDomInstance, 'gaea-selected')) {
                    this.selfDomInstance.className += ' gaea-selected';
                }
            } else {
                removeClass(this.selfDomInstance, 'gaea-selected');
            }
        }
    }, {
        key: "handleMouseOver",
        value: function handleMouseOver(event) {
            event.stopPropagation();
            this.props.application.event.emit(this.props.application.event.viewportOrTreeComponentMouseOver, {
                mapUniqueKey: this.props.mapUniqueKey,
                type: 'component'
            });
            this.props.viewport.setHoveringComponentMapUniqueKey(this.props.mapUniqueKey);
        }
    }, {
        key: "outerMoveBoxToSelf",
        value: function outerMoveBoxToSelf() {
            this.props.viewport.setHoverComponent(this.selfDomInstance);
        }
    }, {
        key: "setSelect",
        value: function setSelect(selected) {
            this.setState({
                selected: selected
            });
        }
    }, {
        key: "handleClick",
        value: function handleClick(event) {
            event.stopPropagation();
            this.props.viewport.setCurrentEditComponentMapUniqueKey(this.props.mapUniqueKey);
            if (this.props.viewport.lastSelectMapUniqueKey !== null) {
                this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
                    mapUniqueKey: this.props.viewport.lastSelectMapUniqueKey,
                    selected: false
                });
            }
            this.props.viewport.setLastSelectMapUniqueKey(this.props.mapUniqueKey);
            this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
                mapUniqueKey: this.props.mapUniqueKey,
                selected: true
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var childs = null;
            if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.parentMapUniqueKey === null) {
                var showLayoutBorder = this.props.viewport.showLayoutBorder;
            }
            if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.layoutChilds) {
                childs = this.componentInfo.layoutChilds.map(function (layoutChildUniqueMapKey) {
                    return React.createElement(EditHelper_1.ObserveEditHelper, { key: layoutChildUniqueMapKey, mapUniqueKey: layoutChildUniqueMapKey, ref: "edit-" + layoutChildUniqueMapKey });
                });
            }
            var componentProps = JSON.parse(JSON.stringify(this.componentInfo.props));
            componentProps.ref = function (ref) {
                _this3.selfInstance = ref;
            };
            return React.createElement(this.SelfComponent, componentProps, childs);
        }
    }]);
    return EditHelper;
}(React.Component);
var EditHelper = EditHelper_1;
EditHelper.defaultProps = new typings.Props();
EditHelper.ObserveEditHelper = mobx_react_1.inject('application', 'viewport', 'setting')(mobx_react_1.observer(EditHelper_1));
__decorate([index_1.autoBindMethod], EditHelper.prototype, "setDraggingClass", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "setSelectStyle", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "handleMouseOver", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "outerMoveBoxToSelf", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "setSelect", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "handleClick", null);
EditHelper = EditHelper_1 = __decorate([mobx_react_1.inject('application', 'viewport', 'setting'), mobx_react_1.observer], EditHelper);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditHelper;