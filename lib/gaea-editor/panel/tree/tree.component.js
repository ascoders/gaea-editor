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
var mobx_react_1 = require("mobx-react");
var $ = require("jquery");
var index_1 = require('nt-web-tree');
var index_2 = require('nt-auto-bind');
var tree_element_component_1 = require("./tree-element/tree-element.component");
var tree_move_box_component_1 = require("./tree-move-box/tree-move-box.component");
require("./tree.css");
var Tree = function (_React$Component) {
    (0, _inherits3.default)(Tree, _React$Component);

    function Tree() {
        (0, _classCallCheck3.default)(this, Tree);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Tree, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.childDomInstance = ReactDOM.findDOMNode(this.childInstance);
            this.props.viewport.setTreeDomInstance(this.childDomInstance);
            this.addListener();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.props.application.event.off(this.props.application.event.viewportOrTreeComponentMouseOver, this.handleViewportOrTreeComponentMouseOver);
            this.props.application.event.off(this.props.application.event.viewportOrTreeRootComponentMouseLeave, this.handleViewportOrTreeRootComponentMouseLeave);
            this.props.application.event.off(this.props.application.event.changeComponentSelectStatusEvent, this.handleChangeComponentSelectStatus);
        }
    }, {
        key: "addListener",
        value: function addListener() {
            this.props.application.event.on(this.props.application.event.viewportOrTreeComponentMouseOver, this.handleViewportOrTreeComponentMouseOver);
            this.props.application.event.on(this.props.application.event.viewportOrTreeRootComponentMouseLeave, this.handleViewportOrTreeRootComponentMouseLeave);
            this.props.application.event.on(this.props.application.event.changeComponentSelectStatusEvent, this.handleChangeComponentSelectStatus);
        }
    }, {
        key: "handleViewportOrTreeComponentMouseOver",
        value: function handleViewportOrTreeComponentMouseOver(listnerContext, opts) {
            var targetInstance = this.findEditHelperByMapUniqueKey(opts.mapUniqueKey);
            targetInstance.outerMoveBoxToSelf();
            if (opts.type !== 'tree' && this.props.viewport.lastSelectMapUniqueKey === null) {
                this.scrollToChildren(targetInstance);
            }
        }
    }, {
        key: "scrollToChildren",
        value: function scrollToChildren(child) {
            var $domTree = $(ReactDOM.findDOMNode(this));
            var $treeInstance = $(child.getDomInstance());
            $domTree.stop().animate({
                scrollTop: $treeInstance.offset().top - $domTree.offset().top + $domTree.scrollTop() - 50
            }, 100);
        }
    }, {
        key: "findEditHelperByMapUniqueKey",
        value: function findEditHelperByMapUniqueKey(mapUniqueKey) {
            var finderPath = this.props.viewport.findComponentPathFromRoot(mapUniqueKey);
            var targetInstance = this.refs["tree-" + this.props.viewport.rootMapUniqueKey]['wrappedInstance'];
            finderPath.forEach(function (path) {
                targetInstance = targetInstance.refs["tree-" + path]['wrappedInstance'];
            });
            return targetInstance;
        }
    }, {
        key: "handleViewportOrTreeRootComponentMouseLeave",
        value: function handleViewportOrTreeRootComponentMouseLeave() {
            this.props.viewport.setTreeLeaveHover();
        }
    }, {
        key: "handleChangeComponentSelectStatus",
        value: function handleChangeComponentSelectStatus(listnerContext, opts) {
            var targetInstance = this.findEditHelperByMapUniqueKey(opts.mapUniqueKey);
            targetInstance.setSelect(opts.selected);
            this.scrollToChildren(targetInstance);
        }
    }, {
        key: "setChildRef",
        value: function setChildRef(ref) {
            this.childInstance = ref;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-tree" }, React.createElement("div", { className: "component-count" }, "实例数:", this.props.viewport.components.size), React.createElement("div", { ref: this.setChildRef }, React.createElement(index_1.Tree, { defaultExpendAll: true, toggleByArrow: true }, React.createElement(tree_element_component_1.default, { mapUniqueKey: this.props.viewport.rootMapUniqueKey, ref: "tree-" + this.props.viewport.rootMapUniqueKey }))), React.createElement(tree_move_box_component_1.default, null));
        }
    }]);
    return Tree;
}(React.Component);
Tree.defaultProps = new typings.Props();
__decorate([index_2.autoBindMethod], Tree.prototype, "addListener", null);
__decorate([index_2.autoBindMethod], Tree.prototype, "handleViewportOrTreeComponentMouseOver", null);
__decorate([index_2.autoBindMethod], Tree.prototype, "scrollToChildren", null);
__decorate([index_2.autoBindMethod], Tree.prototype, "findEditHelperByMapUniqueKey", null);
__decorate([index_2.autoBindMethod], Tree.prototype, "handleViewportOrTreeRootComponentMouseLeave", null);
__decorate([index_2.autoBindMethod], Tree.prototype, "handleChangeComponentSelectStatus", null);
__decorate([index_2.autoBindMethod], Tree.prototype, "setChildRef", null);
Tree = __decorate([mobx_react_1.inject('application', 'viewport'), mobx_react_1.observer], Tree);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tree;