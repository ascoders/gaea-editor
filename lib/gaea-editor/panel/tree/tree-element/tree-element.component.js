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
var typings = require("./tree-element.type");
var mobx_react_1 = require("mobx-react");
var classNames = require("classnames");
var index_1 = require('nt-web-tree');
var index_2 = require('nt-auto-bind');
var Sortable = require("sortablejs");
require("./tree-element.css");
var TreeElement_1 = function (_React$Component) {
    (0, _inherits3.default)(TreeElement, _React$Component);

    function TreeElement() {
        (0, _classCallCheck3.default)(this, TreeElement);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TreeElement.__proto__ || Object.getPrototypeOf(TreeElement)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(TreeElement, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.viewport.components.get(this.props.mapUniqueKey);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.selfDomInstance = ReactDOM.findDOMNode(this.selfInstance);
            if (this.componentInfo.props.canDragIn) {
                (function () {
                    var dragChildrenInstance = _this2.selfDomInstance.querySelector('.children');
                    _this2.sortable = Sortable.create(dragChildrenInstance, {
                        animation: 150,
                        group: {
                            name: 'gaea-can-drag-in-tree',
                            pull: true,
                            put: true
                        },
                        onStart: function onStart(event) {
                            _this2.props.viewport.startDragging(_this2.componentInfo.layoutChilds[event.oldIndex], '', false, dragChildrenInstance, event.oldIndex);
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
                })();
            }
        }
    }, {
        key: "getDomInstance",
        value: function getDomInstance() {
            return this.selfDomInstance;
        }
    }, {
        key: "treeNameRender",
        value: function treeNameRender() {
            var eventTag = void 0;
            if (this.componentInfo.props.gaeaEventData.length > 0) {
                eventTag = React.createElement("i", { className: "event-container fa fa-bolt" });
            }
            if (this.componentInfo.props.gaeaUniqueKey.indexOf('gaea') > -1) {
                return React.createElement("div", { className: "flex" }, React.createElement("i", { className: "fa fa-" + this.componentInfo.props.gaeaIcon + " icons gaea" }), React.createElement("span", { className: "text" }, this.componentInfo.props.gaeaName), eventTag);
            } else {
                return React.createElement("div", { className: "flex" }, React.createElement("i", { className: "fa fa-" + this.componentInfo.props.gaeaIcon + " icons" }), React.createElement("span", { className: "text" }, this.componentInfo.props.gaeaName), eventTag);
            }
        }
    }, {
        key: "handleMouseOver",
        value: function handleMouseOver(event) {
            event.stopPropagation();
            this.props.application.event.emit(this.props.application.event.viewportOrTreeComponentMouseOver, {
                mapUniqueKey: this.props.mapUniqueKey,
                type: 'tree'
            });
            this.props.viewport.setHoveringComponentMapUniqueKey(this.props.mapUniqueKey);
        }
    }, {
        key: "handleMouseLeave",
        value: function handleMouseLeave(event) {
            event.stopPropagation();
            this.props.application.event.emit(this.props.application.event.viewportOrTreeRootComponentMouseLeave, {
                mapUniqueKey: this.props.mapUniqueKey,
                type: 'tree'
            });
            this.props.viewport.setHoveringComponentMapUniqueKey(null);
        }
    }, {
        key: "outerMoveBoxToSelf",
        value: function outerMoveBoxToSelf() {
            this.props.viewport.setHoverTreeComponent(this.selfDomInstance);
        }
    }, {
        key: "handleClick",
        value: function handleClick() {
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
        key: "setSelect",
        value: function setSelect(selected) {
            this.setState({
                selected: selected
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var resultElement = void 0;
            var childs = null;
            if (this.componentInfo.props.canDragIn && this.componentInfo.layoutChilds) {
                childs = this.componentInfo.layoutChilds.map(function (layoutChildUniqueMapKey) {
                    return React.createElement(TreeElement_1.ObserveTreeElement, { key: layoutChildUniqueMapKey, mapUniqueKey: layoutChildUniqueMapKey, ref: "tree-" + layoutChildUniqueMapKey });
                });
            }
            var childProps = {
                render: this.treeNameRender,
                defaultExpendAll: true,
                toggleByArrow: true,
                onMouseOver: this.handleMouseOver,
                onClick: this.handleClick,
                ref: function ref(_ref) {
                    _this3.selfInstance = _ref;
                },
                className: classNames({
                    'nt-editor-gaea-editor-gaea_editor-panel-tree-tree_element': true,
                    'selected': this.state.selected
                }),
                onMouseLeave: this.componentInfo.props.canDragIn ? this.handleMouseLeave : null,
                name: this.componentInfo.props.name,
                icon: this.componentInfo.props.icon
            };
            resultElement = React.createElement(index_1.TreeNode, childProps, childs);
            return resultElement;
        }
    }]);
    return TreeElement;
}(React.Component);
var TreeElement = TreeElement_1;
TreeElement.defaultProps = new typings.Props();
TreeElement.ObserveTreeElement = mobx_react_1.inject('application', 'viewport')(mobx_react_1.observer(TreeElement_1));
__decorate([index_2.autoBindMethod], TreeElement.prototype, "treeNameRender", null);
__decorate([index_2.autoBindMethod], TreeElement.prototype, "handleMouseOver", null);
__decorate([index_2.autoBindMethod], TreeElement.prototype, "handleMouseLeave", null);
__decorate([index_2.autoBindMethod], TreeElement.prototype, "outerMoveBoxToSelf", null);
__decorate([index_2.autoBindMethod], TreeElement.prototype, "handleClick", null);
__decorate([index_2.autoBindMethod], TreeElement.prototype, "setSelect", null);
TreeElement = TreeElement_1 = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], TreeElement);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TreeElement;