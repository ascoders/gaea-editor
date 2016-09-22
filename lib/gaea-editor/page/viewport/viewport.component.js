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
var typings = require('./viewport.type');
var mobx_react_1 = require('mobx-react');
require('./viewport.css');
var index_1 = require('nt-auto-bind');
var edit_helper_component_1 = require('./edit-helper/edit-helper.component');
var Viewport = function (_React$Component) {
    _inherits(Viewport, _React$Component);

    function Viewport() {
        var _ref;

        _classCallCheck(this, Viewport);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Viewport.__proto__ || Object.getPrototypeOf(Viewport)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        _this.handleAnyDomChange = function () {
            _this.props.viewport.resetComponentOutline();
        };
        return _this;
    }

    _createClass(Viewport, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.addListener();
            window.addEventListener('resize', this.handleAnyDomChange.bind(this));
            var observer = new MutationObserver(this.handleAnyDomChange.bind(this));
            observer.observe(ReactDOM.findDOMNode(this), {
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
__decorate([index_1.autoBindMethod], Viewport.prototype, "handleMouseLeave", null);
Viewport = __decorate([mobx_react_1.inject('application', 'viewport'), mobx_react_1.observer], Viewport);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Viewport;
//# sourceMappingURL=viewport.component.js.map