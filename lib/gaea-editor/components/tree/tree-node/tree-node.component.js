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
var typings = require("./tree-node.type");
var classNames = require("classnames");
var EditorManager = require("../../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-tree');
require("./tree-node.css");
var TreeNodeComponent_1 = function (_React$Component) {
    (0, _inherits3.default)(TreeNodeComponent, _React$Component);

    function TreeNodeComponent() {
        (0, _classCallCheck3.default)(this, TreeNodeComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TreeNodeComponent.__proto__ || Object.getPrototypeOf(TreeNodeComponent)).apply(this, arguments));

        _this.state = new typings.State();
        _this.componentInfo = null;
        return _this;
    }

    (0, _createClass3.default)(TreeNodeComponent, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.ViewportStore.components.get(this.props.mapUniqueKey);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.props.TreeAction.addTreeDom(this.props.mapUniqueKey, ReactDOM.findDOMNode(this));
            this.props.EventAction.on(this.props.EventStore.viewportDomUpdate + "." + this.props.mapUniqueKey, this.updateDom);
            if (this.componentInfo.props.canDragIn) {
                this.props.ViewportAction.registerInnerDrag(this.props.mapUniqueKey, ReactDOM.findDOMNode(this).querySelector('.children'), 'gaea-tree-can-drag-in');
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.props.ViewportAction.removeDomInstance(this.props.mapUniqueKey);
            this.props.EventAction.off(this.props.EventStore.viewportDomUpdate + "." + this.props.mapUniqueKey, this.updateDom);
        }
    }, {
        key: "updateDom",
        value: function updateDom() {
            this.props.TreeAction.addTreeDom(this.props.mapUniqueKey, ReactDOM.findDOMNode(this));
        }
    }, {
        key: "handleRenderTitle",
        value: function handleRenderTitle() {
            var eventTag = void 0;
            if (this.componentInfo.props.gaeaEventData && this.componentInfo.props.gaeaEventData.length > 0 || this.componentInfo.props.gaeaNativeEventData && this.componentInfo.props.gaeaNativeEventData.length) {
                eventTag = React.createElement("i", { className: "event-container fa fa-bolt" });
            }
            return React.createElement("div", { className: "item-container" }, React.createElement("div", { className: "icon-container" }, React.createElement("i", { className: "fa fa-" + this.componentInfo.props.gaeaIcon })), React.createElement("div", { className: "title" }, this.componentInfo.props.gaeaName, eventTag));
        }
    }, {
        key: "handleMouseOver",
        value: function handleMouseOver(event) {
            event.stopPropagation();
            this.props.ViewportAction.setCurrentHoverComponentMapUniqueKey(this.props.mapUniqueKey);
        }
    }, {
        key: "handleClick",
        value: function handleClick(event) {
            event.stopPropagation();
            this.props.ViewportAction.setCurrentEditComponentMapUniqueKey(this.props.mapUniqueKey);
        }
    }, {
        key: "render",
        value: function render() {
            var resultElement = void 0;
            var childs = null;
            if (this.componentInfo.props.canDragIn && this.componentInfo.layoutChilds) {
                childs = this.componentInfo.layoutChilds.map(function (layoutChildUniqueMapKey) {
                    return React.createElement(TreeNodeComponent_1.ObserveTreeElement, { key: layoutChildUniqueMapKey, mapUniqueKey: layoutChildUniqueMapKey, ref: "tree-" + layoutChildUniqueMapKey });
                });
            }
            var childProps = {
                render: this.handleRenderTitle,
                defaultExpendAll: true,
                toggleByArrow: true,
                onMouseOver: this.handleMouseOver,
                onClick: this.handleClick,
                className: classNames({
                    'nt-editor-gaea-editor-gaea_editor-components-tree-tree_node': true
                })
            };
            this.handleRenderTitle();
            resultElement = React.createElement(index_2.TreeNode, childProps, childs);
            return resultElement;
        }
    }]);
    return TreeNodeComponent;
}(React.Component);
var TreeNodeComponent = TreeNodeComponent_1;
TreeNodeComponent.defaultProps = new typings.Props();
TreeNodeComponent.ObserveTreeElement = EditorManager.reactInject('EventStore', 'ViewportStore', 'ViewportAction', 'EventAction', 'TreeAction')(EditorManager.observer(TreeNodeComponent_1));
__decorate([index_1.autoBindMethod], TreeNodeComponent.prototype, "updateDom", null);
__decorate([index_1.autoBindMethod], TreeNodeComponent.prototype, "handleRenderTitle", null);
__decorate([index_1.autoBindMethod], TreeNodeComponent.prototype, "handleMouseOver", null);
__decorate([index_1.autoBindMethod], TreeNodeComponent.prototype, "handleClick", null);
TreeNodeComponent = TreeNodeComponent_1 = __decorate([EditorManager.observer(['EventStore', 'ViewportStore', 'ViewportAction', 'EventAction', 'TreeAction'])], TreeNodeComponent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TreeNodeComponent;