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
var typings = require('./components.type');
var mobx_react_1 = require('mobx-react');
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-button');
var Sortable = require('sortablejs');
var drag_source_component_1 = require('./drag-source.component');
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
    _inherits(Components, _React$Component);

    function Components() {
        var _ref;

        _classCallCheck(this, Components);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Components.__proto__ || Object.getPrototypeOf(Components)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(Components, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            Sortable.create(ReactDOM.findDOMNode(this.dragContainerInstance), {
                animation: 150,
                group: {
                    name: 'gaea-layout',
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
        key: "renderDragComponents",
        value: function renderDragComponents() {
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
                        return React.createElement(drag_source_component_1.default, { key: index }, React.createElement("i", { className: "fa fa-cubes icons gaea" }), component.name);
                    });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var SwitchButtonGroup = this.renderSwitchButtonGroup();
            var DragComponents = this.renderDragComponents();
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-sidebar_tools-tools-components components-container" }, React.createElement("div", { className: "container", ref: this.setDragContainerInstance }, DragComponents), React.createElement("div", { className: "switch" }, React.createElement(index_2.ButtonGroup, { className: "button-group", vertical: true }, SwitchButtonGroup)));
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
//# sourceMappingURL=components.component.js.map