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
var typings = require("./tree.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var tree_node_component_1 = require("./tree-node/tree-node.component");
var index_1 = require('nt-web-tree');
var index_2 = require('nt-auto-bind');
var action_1 = require("./action");
var store_1 = require("./store");
var guideline_component_1 = require("./guideline/guideline.component");
require("./tree.css");
var TreePlugin = function (_React$Component) {
    (0, _inherits3.default)(TreePlugin, _React$Component);

    function TreePlugin() {
        (0, _classCallCheck3.default)(this, TreePlugin);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TreePlugin.__proto__ || Object.getPrototypeOf(TreePlugin)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(TreePlugin, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var treeContainerDom = ReactDOM.findDOMNode(this.refs['treeContainer']);
            this.props.TreeAction.setTreeRootDom(treeContainerDom);
        }
    }, {
        key: "handleMouseLeave",
        value: function handleMouseLeave() {
            this.props.ViewportAction.setCurrentHoverComponentMapUniqueKey(null);
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.ApplicationStore.pageValue === 'empty') {
                return null;
            }
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-tree" }, React.createElement("div", { className: "tree-container", ref: "treeContainer" }, React.createElement(index_1.Tree, { defaultExpendAll: true, toggleByArrow: true, onMouseLeave: this.handleMouseLeave, style: { width: '100%' } }, React.createElement(tree_node_component_1.default, { mapUniqueKey: this.props.ViewportStore.rootMapUniqueKey })), React.createElement(guideline_component_1.default, null)), React.createElement("div", { className: "absolute-container" }, "实例数:", this.props.ViewportStore.components.size));
        }
    }]);
    return TreePlugin;
}(React.Component);
TreePlugin.defaultProps = new typings.Props();
TreePlugin.position = 'mainToolBottom';
TreePlugin.Action = action_1.default;
TreePlugin.Store = store_1.default;
__decorate([index_2.autoBindMethod], TreePlugin.prototype, "handleMouseLeave", null);
TreePlugin = __decorate([EditorManager.observer(['ViewportStore', 'ApplicationStore', 'ViewportAction', 'TreeAction'])], TreePlugin);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TreePlugin;