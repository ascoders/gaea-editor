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
var classNames = require("classnames");
var mobx_react_1 = require("mobx-react");
var LZString = require("lz-string");
var index_1 = require('nt-auto-bind');
var edit_helper_component_1 = require("./edit-helper/edit-helper.component");
require("./viewport.css");
var Viewport = function (_React$Component) {
    (0, _inherits3.default)(Viewport, _React$Component);

    function Viewport() {
        (0, _classCallCheck3.default)(this, Viewport);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Viewport.__proto__ || Object.getPrototypeOf(Viewport)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Viewport, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.freshView();
            this.props.EventAction.on(this.props.EventStore.refreshPage, this.refreshView);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.props.EventAction.off(this.props.EventStore.refreshPage, this.refreshView);
        }
    }, {
        key: "refreshView",
        value: function refreshView() {}
    }, {
        key: "freshView",
        value: function freshView() {
            var _this2 = this;

            if (this.props.ApplicationStore.pageValue === 'empty') {
                return;
            }
            if (this.props.ApplicationStore.pageValue === null) {
                var rootMapUniqueKey = this.props.ViewportAction.createUniqueKey();
                this.props.ViewportAction.setRootMapUniqueKey(rootMapUniqueKey);
                var RootClass = this.props.ApplicationAction.getComponentClassByGaeaUniqueKey(this.props.ApplicationStore.editorProps.rootLayoutComponentUniqueKey);
                var rootProps = _.cloneDeep(RootClass.defaultProps);
                rootProps.style.backgroundColor = 'white';
                if (this.props.ApplicationStore.editorProps.isReactNative) {
                    rootProps.style.flex = 1;
                    rootProps.style.overflowY = 'auto';
                    rootProps.style.flexDirection = 'column';
                } else {
                    rootProps.style.flexGrow = 1;
                    rootProps.style.flexDirection = 'column';
                    rootProps.style.display = 'block';
                    rootProps.style.overflow = null;
                    rootProps.style.overflowX = 'hidden';
                    rootProps.style.overflowY = 'auto';
                }
                this.props.ViewportAction.setComponent(this.props.ViewportStore.rootMapUniqueKey, {
                    props: rootProps,
                    layoutChilds: [],
                    parentMapUniqueKey: null
                });
            } else {
                (function () {
                    var defaultValue = JSON.parse(LZString.decompressFromBase64(_this2.props.ApplicationStore.pageValue));
                    Object.keys(defaultValue).forEach(function (mapUniqueKey) {
                        var defaultInfo = defaultValue[mapUniqueKey];
                        var ComponentClass = _this2.props.ApplicationAction.getComponentClassByGaeaUniqueKey(defaultInfo.props.gaeaUniqueKey);
                        if (defaultInfo.parentMapUniqueKey === null) {
                            _this2.props.ViewportAction.setRootMapUniqueKey(mapUniqueKey);
                        }
                        var props = _.merge(_.cloneDeep(ComponentClass.defaultProps), defaultInfo.props || {});
                        _this2.props.ViewportAction.setComponent(mapUniqueKey, {
                            props: props,
                            layoutChilds: defaultInfo.layoutChilds || [],
                            parentMapUniqueKey: defaultInfo.parentMapUniqueKey
                        });
                    });
                })();
            }
        }
    }, {
        key: "getRootRef",
        value: function getRootRef(ref) {
            this.props.ViewportAction.setViewportDom(ReactDOM.findDOMNode(ref));
        }
    }, {
        key: "handleMouseLeave",
        value: function handleMouseLeave(event) {
            event.stopPropagation();
            this.props.EventAction.emit(this.props.EventStore.mouseLeaveViewport);
            this.props.ViewportAction.setCurrentHoverComponentMapUniqueKey(null);
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.ApplicationStore.pageValue === 'empty') {
                return null;
            }
            var classes = classNames({
                'nt-editor-gaea-editor-gaea_editor-page-viewport': true,
                'layout-active': this.props.ViewportStore.isLayoutComponentActive
            });
            return React.createElement("div", { className: classes, onMouseLeave: this.handleMouseLeave, ref: this.getRootRef }, React.createElement(edit_helper_component_1.default, { mapUniqueKey: this.props.ViewportStore.rootMapUniqueKey }));
        }
    }]);
    return Viewport;
}(React.Component);
Viewport.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], Viewport.prototype, "refreshView", null);
__decorate([index_1.autoBindMethod], Viewport.prototype, "getRootRef", null);
__decorate([index_1.autoBindMethod], Viewport.prototype, "handleMouseLeave", null);
Viewport = __decorate([mobx_react_1.observer(['ApplicationStore', 'ViewportStore', 'EventStore', 'ApplicationAction', 'EventAction', 'ViewportAction'])], Viewport);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Viewport;