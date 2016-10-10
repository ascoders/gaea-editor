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
var ReactDOM = require('react-dom');
var typings = require('./edit-helper.type');
var mobx_react_1 = require('mobx-react');
var index_1 = require('nt-auto-bind');
var Sortable = require('sortablejs');
require('./edit-helper.css');
var hasClass = function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};
var removeClass = function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
};
var EditHelper_1 = void 0;
var EditHelper = EditHelper_1 = function (_React$Component) {
    _inherits(EditHelper, _React$Component);

    function EditHelper() {
        var _ref;

        _classCallCheck(this, EditHelper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = EditHelper.__proto__ || Object.getPrototypeOf(EditHelper)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        _this.isMovingComponent = false;
        return _this;
    }

    _createClass(EditHelper, [{
        key: "componentWillReact",
        value: function componentWillReact() {
            if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.parentMapUniqueKey === null) {
                if (this.props.viewport.isMovingComponent || this.props.viewport.showLayoutBorder) {
                    if (!hasClass(this.selfDomInstance, 'gaea-layout-active')) {
                        this.selfDomInstance.className += ' gaea-layout-active';
                    }
                } else {
                    removeClass(this.selfDomInstance, 'gaea-layout-active');
                }
            }
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
                this.isMovingComponent = this.props.viewport.isMovingComponent;
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
EditHelper.defaultProps = new typings.Props();
EditHelper.ObserveEditHelper = mobx_react_1.inject('application', 'viewport', 'setting')(mobx_react_1.observer(EditHelper));
__decorate([index_1.autoBindMethod], EditHelper.prototype, "setDraggingClass", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "setSelectStyle", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "handleMouseOver", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "outerMoveBoxToSelf", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "setSelect", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "handleClick", null);
EditHelper = EditHelper_1 = __decorate([mobx_react_1.inject('application', 'viewport', 'setting'), mobx_react_1.observer], EditHelper);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditHelper;