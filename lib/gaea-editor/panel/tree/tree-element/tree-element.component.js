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
var typings = require('./tree-element.type');
var mobx_react_1 = require('mobx-react');
var classNames = require('classnames');
var index_1 = require('nt-web-tree');
var index_2 = require('nt-auto-bind');
require('./tree-element.css');
var TreeElement_1 = void 0;
var TreeElement = TreeElement_1 = function (_React$Component) {
    _inherits(TreeElement, _React$Component);

    function TreeElement() {
        var _ref;

        _classCallCheck(this, TreeElement);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = TreeElement.__proto__ || Object.getPrototypeOf(TreeElement)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(TreeElement, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.viewport.components.get(this.props.mapUniqueKey);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.childDomInstance = ReactDOM.findDOMNode(this.childInstance);
        }
    }, {
        key: "getDomInstance",
        value: function getDomInstance() {
            return this.childDomInstance;
        }
    }, {
        key: "treeNameRender",
        value: function treeNameRender() {
            if (this.componentInfo.props.gaeaUniqueKey.indexOf('gaea') > -1) {
                return React.createElement("div", { className: "flex" }, React.createElement("i", { className: "fa fa-" + this.componentInfo.props.gaeaIcon + " icons gaea" }), React.createElement("span", { className: "text" }, this.componentInfo.props.gaeaName));
            } else {
                return React.createElement("div", { className: "flex" }, React.createElement("i", { className: "fa fa-" + this.componentInfo.props.gaeaIcon + " icons" }), React.createElement("span", { className: "text" }, this.componentInfo.props.gaeaName));
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
            this.props.viewport.setHoverTreeComponent(this.childDomInstance);
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
            var _this2 = this;

            var resultElement = void 0;
            var childs = null;
            if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.layoutChilds) {
                childs = this.componentInfo.layoutChilds.map(function (layoutChildUniqueMapKey) {
                    return React.createElement(TreeElement_1.ObserveTreeElement, { key: layoutChildUniqueMapKey, mapUniqueKey: layoutChildUniqueMapKey, ref: "tree-" + layoutChildUniqueMapKey });
                });
            }
            var childProps = {
                render: this.treeNameRender,
                defaultExpendAll: true,
                onMouseOver: this.handleMouseOver,
                onClick: this.handleClick,
                ref: function ref(_ref2) {
                    _this2.childInstance = _ref2;
                },
                className: classNames({
                    'nt-editor-gaea-editor-gaea_editor-panel-tree-tree_element': true,
                    'selected': this.state.selected
                }),
                onMouseLeave: this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' ? this.handleMouseLeave : null,
                name: this.componentInfo.props.name,
                icon: this.componentInfo.props.icon
            };
            resultElement = React.createElement(index_1.TreeNode, childProps, childs);
            return resultElement;
        }
    }]);

    return TreeElement;
}(React.Component);
TreeElement.defaultProps = new typings.Props();
TreeElement.ObserveTreeElement = mobx_react_1.inject('application', 'viewport')(mobx_react_1.observer(TreeElement));
__decorate([index_2.autoBindMethod], TreeElement.prototype, "treeNameRender", null);
__decorate([index_2.autoBindMethod], TreeElement.prototype, "handleMouseOver", null);
__decorate([index_2.autoBindMethod], TreeElement.prototype, "handleMouseLeave", null);
__decorate([index_2.autoBindMethod], TreeElement.prototype, "outerMoveBoxToSelf", null);
__decorate([index_2.autoBindMethod], TreeElement.prototype, "handleClick", null);
__decorate([index_2.autoBindMethod], TreeElement.prototype, "setSelect", null);
TreeElement = TreeElement_1 = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], TreeElement);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TreeElement;