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
var typings = require('./tree.type');
var mobx_react_1 = require('mobx-react');
var $ = require('jquery');
var index_1 = require('nt-web-tree');
var index_2 = require('nt-auto-bind');
var tree_element_component_1 = require('./tree-element/tree-element.component');
var tree_move_box_component_1 = require('./tree-move-box/tree-move-box.component');
require('./tree.css');
var Tree = function (_React$Component) {
    _inherits(Tree, _React$Component);

    function Tree() {
        var _ref;

        _classCallCheck(this, Tree);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Tree.__proto__ || Object.getPrototypeOf(Tree)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(Tree, [{
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
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-tree" }, React.createElement("div", { className: "component-count" }, "实例数:", this.props.viewport.components.size), React.createElement("div", { ref: this.setChildRef }, React.createElement(index_1.Tree, { defaultExpendAll: true }, React.createElement(tree_element_component_1.default, { mapUniqueKey: this.props.viewport.rootMapUniqueKey, ref: "tree-" + this.props.viewport.rootMapUniqueKey }))), React.createElement(tree_move_box_component_1.default, null));
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
//# sourceMappingURL=tree.component.js.map