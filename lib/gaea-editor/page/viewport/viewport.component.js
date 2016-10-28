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
var typings = require("./viewport.type");
var mobx_react_1 = require("mobx-react");
require("./viewport.css");
var index_1 = require('nt-auto-bind');
var edit_helper_component_1 = require("./edit-helper/edit-helper.component");
var Viewport = function (_React$Component) {
    (0, _inherits3.default)(Viewport, _React$Component);

    function Viewport() {
        (0, _classCallCheck3.default)(this, Viewport);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Viewport.__proto__ || Object.getPrototypeOf(Viewport)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Viewport, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.addListener();
            window.addEventListener('resize', this.handleAnyDomChange);
            var mObserver = new MutationObserver(this.handleAnyDomChange.bind(this));
            mObserver.observe(ReactDOM.findDOMNode(this), {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.props.application.event.off(this.props.application.event.viewportOrTreeComponentMouseOver, this.handleViewportOrTreeComponentMouseOver);
            this.props.application.event.off(this.props.application.event.viewportOrTreeRootComponentMouseLeave, this.handleViewportOrTreeRootComponentMouseLeave);
            this.props.application.event.off(this.props.application.event.changeComponentSelectStatusEvent, this.handleChangeComponentSelectStatus);
            window.removeEventListener('resize', this.handleAnyDomChange);
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
        }
    }, {
        key: "findEditHelperByMapUniqueKey",
        value: function findEditHelperByMapUniqueKey(mapUniqueKey) {
            var finderPath = this.props.viewport.findComponentPathFromRoot(mapUniqueKey);
            var targetInstance = this.refs["edit-" + this.props.viewport.rootMapUniqueKey]['wrappedInstance'];
            finderPath.forEach(function (path) {
                targetInstance = targetInstance.refs["edit-" + path]['wrappedInstance'];
            });
            return targetInstance;
        }
    }, {
        key: "handleViewportOrTreeRootComponentMouseLeave",
        value: function handleViewportOrTreeRootComponentMouseLeave() {
            this.props.viewport.setLeaveHover();
        }
    }, {
        key: "handleChangeComponentSelectStatus",
        value: function handleChangeComponentSelectStatus(listnerContext, opts) {
            var targetInstance = this.findEditHelperByMapUniqueKey(opts.mapUniqueKey);
            targetInstance.setSelect(opts.selected);
        }
    }, {
        key: "getRootRef",
        value: function getRootRef(ref) {
            this.props.viewport.setViewportDomInstance(ReactDOM.findDOMNode(ref));
        }
    }, {
        key: "handleAnyDomChange",
        value: function handleAnyDomChange() {
            this.props.viewport.resetComponentOutline();
        }
    }, {
        key: "handleMouseLeave",
        value: function handleMouseLeave(event) {
            event.stopPropagation();
            this.props.application.event.emit(this.props.application.event.viewportOrTreeRootComponentMouseLeave, {
                mapUniqueKey: this.props.viewport.rootMapUniqueKey,
                type: 'component'
            });
            this.props.viewport.setHoveringComponentMapUniqueKey(null);
        }
    }, {
        key: "render",
        value: function render() {
            var style = {
                display: this.props.application.isPreview && 'none'
            };
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-viewport", style: style, onMouseLeave: this.handleMouseLeave, ref: this.getRootRef }, React.createElement(edit_helper_component_1.default, { mapUniqueKey: this.props.viewport.rootMapUniqueKey, ref: "edit-" + this.props.viewport.rootMapUniqueKey }));
        }
    }]);
    return Viewport;
}(React.Component);
Viewport.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], Viewport.prototype, "addListener", null);
__decorate([index_1.autoBindMethod], Viewport.prototype, "handleViewportOrTreeComponentMouseOver", null);
__decorate([index_1.autoBindMethod], Viewport.prototype, "findEditHelperByMapUniqueKey", null);
__decorate([index_1.autoBindMethod], Viewport.prototype, "handleViewportOrTreeRootComponentMouseLeave", null);
__decorate([index_1.autoBindMethod], Viewport.prototype, "handleChangeComponentSelectStatus", null);
__decorate([index_1.autoBindMethod], Viewport.prototype, "getRootRef", null);
__decorate([index_1.autoBindMethod], Viewport.prototype, "handleAnyDomChange", null);
__decorate([index_1.autoBindMethod], Viewport.prototype, "handleMouseLeave", null);
Viewport = __decorate([mobx_react_1.inject('application', 'viewport'), mobx_react_1.observer], Viewport);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Viewport;