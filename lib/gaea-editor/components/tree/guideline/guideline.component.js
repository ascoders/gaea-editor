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
var $ = require("jquery");
var typings = require("./guideline.type");
var EditorManager = require("../../../../gaea-editor-manager/gaea-editor-manager");
require("./guideline.css");
var Guideline = function (_React$Component) {
    (0, _inherits3.default)(Guideline, _React$Component);

    function Guideline() {
        (0, _classCallCheck3.default)(this, Guideline);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Guideline.__proto__ || Object.getPrototypeOf(Guideline)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Guideline, [{
        key: "componentWillReact",
        value: function componentWillReact() {
            if (this.props.ViewportStore.currentHoverComponentMapUniqueKey === null || this.props.TreeStore.currentHoverTreeDom === undefined) {
                return;
            }
            if (this.props.ViewportStore.currentDragComponentInfo !== null) {
                return;
            }
            var $nodeDom = $(ReactDOM.findDOMNode(this.props.TreeStore.currentHoverTreeDom));
            var $containerDom = $(this.props.TreeStore.treeRootDom);
            if ($nodeDom.offset().top - $containerDom.offset().top < 20 || $nodeDom.offset().top - $containerDom.offset().top > $containerDom.height() - 50) {
                $containerDom.stop().animate({
                    scrollTop: $nodeDom.offset().top - $containerDom.offset().top + $containerDom.scrollTop() - 50
                }, 50);
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.ViewportStore.currentHoverComponentMapUniqueKey === null || this.props.TreeStore.currentHoverTreeDom === undefined) {
                return null;
            }
            if (this.props.ViewportStore.currentDragComponentInfo !== null) {
                return null;
            }
            var hoverBoundingClientRect = this.props.TreeStore.currentHoverTreeDom.getBoundingClientRect();
            var rootBoundingClientRect = this.props.TreeStore.treeRootDom.getBoundingClientRect();
            var style = {
                width: hoverBoundingClientRect.width - 4,
                height: hoverBoundingClientRect.height - 4,
                left: hoverBoundingClientRect.left - rootBoundingClientRect.left,
                top: hoverBoundingClientRect.top - rootBoundingClientRect.top + this.props.TreeStore.treeRootDom.scrollTop
            };
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-tree-guideline", style: style });
        }
    }]);
    return Guideline;
}(React.Component);
Guideline.defaultProps = new typings.Props();
Guideline = __decorate([EditorManager.observer(['ViewportStore', 'TreeStore'])], Guideline);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Guideline;