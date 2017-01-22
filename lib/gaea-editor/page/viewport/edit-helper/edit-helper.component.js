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
var typings = require("./edit-helper.type");
var mobx_react_1 = require("mobx-react");
var dom_1 = require("../../../utils/dom");
var index_1 = require('nt-auto-bind');
require("./edit-helper.css");
var EditHelper_1 = function (_React$Component) {
    (0, _inherits3.default)(EditHelper, _React$Component);

    function EditHelper() {
        (0, _classCallCheck3.default)(this, EditHelper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditHelper.__proto__ || Object.getPrototypeOf(EditHelper)).apply(this, arguments));

        _this.state = new typings.State();
        _this.startDrag = false;
        _this.lastClientX = null;
        _this.lastClientY = null;
        return _this;
    }

    (0, _createClass3.default)(EditHelper, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.ViewportStore.components.get(this.props.mapUniqueKey);
            this.ComponentClass = this.props.ApplicationAction.getComponentClassByGaeaUniqueKey(this.componentInfo.props.gaeaUniqueKey);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.domInstance = ReactDOM.findDOMNode(this.wrappedInstance);
            this.domInstance.addEventListener('mouseover', this.handleMouseOver);
            this.domInstance.addEventListener('click', this.handleClick);
            if (this.isAbsolute()) {
                this.domInstance.addEventListener('mousedown', this.handleMouseDown);
                this.domInstance.addEventListener('mousemove', this.handleMouseMove);
                this.domInstance.addEventListener('mouseup', this.handleMouseUp);
            }
            this.props.EventAction.on(this.props.EventStore.viewportDomUpdate + "." + this.props.mapUniqueKey, this.updateDom);
            this.domInstance.className += ' nt-editor-gaea-editor-gaea_editor-page-viewport-edit_helper';
            this.setLayoutClassIfCanDragIn();
            this.setDragableClassIfNeed();
            this.props.ViewportAction.setDomInstance(this.props.mapUniqueKey, this.domInstance);
            if (this.componentInfo.props.canDragIn) {
                this.props.ViewportAction.registerInnerDrag(this.props.mapUniqueKey, this.domInstance, 'gaea-can-drag-in', {
                    draggable: '.gaea-draggable'
                });
            }
        }
    }, {
        key: "componentWillUpdate",
        value: function componentWillUpdate(nextProps, nextState) {
            this.setLayoutClassIfCanDragIn();
            this.setDragableClassIfNeed();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.domInstance.removeEventListener('mouseover', this.handleMouseOver);
            this.domInstance.removeEventListener('click', this.handleClick);
            if (this.isAbsolute()) {
                this.domInstance.removeEventListener('mousedown', this.handleMouseDown);
                this.domInstance.removeEventListener('mousemove', this.handleMouseMove);
                this.domInstance.removeEventListener('mouseup', this.handleMouseUp);
            }
            this.props.EventAction.off(this.props.EventStore.viewportDomUpdate + "." + this.props.mapUniqueKey, this.updateDom);
            this.props.ViewportAction.removeDomInstance(this.props.mapUniqueKey);
        }
    }, {
        key: "isAbsolute",
        value: function isAbsolute() {
            return this.componentInfo.props.style && this.componentInfo.props.style.position === 'absolute';
        }
    }, {
        key: "updateDom",
        value: function updateDom() {
            this.props.ViewportAction.setDomInstance(this.props.mapUniqueKey, this.domInstance);
        }
    }, {
        key: "setDragableClassIfNeed",
        value: function setDragableClassIfNeed() {
            if (!this.componentInfo.props.style) {
                dom_1.addClass(this.domInstance, 'gaea-draggable');
            } else {
                if (!this.componentInfo.props.style.position) {
                    dom_1.addClass(this.domInstance, 'gaea-draggable');
                } else if (this.componentInfo.props.style.position === 'absolute' || this.componentInfo.props.style.position === 'fixed') {
                    dom_1.removeClass(this.domInstance, 'gaea-draggable');
                } else {
                    dom_1.addClass(this.domInstance, 'gaea-draggable');
                }
            }
        }
    }, {
        key: "setLayoutClassIfCanDragIn",
        value: function setLayoutClassIfCanDragIn() {
            if (this.componentInfo.props.canDragIn && this.componentInfo.parentMapUniqueKey !== null) {
                if (!dom_1.hasClass(this.domInstance, 'gaea-layout')) {
                    this.domInstance.className += ' gaea-layout';
                }
            }
        }
    }, {
        key: "handleMouseOver",
        value: function handleMouseOver(event) {
            event.stopPropagation();
            this.props.EventAction.emit(this.props.EventStore.mouseHoveringComponent, {
                mapUniqueKey: this.props.mapUniqueKey,
                type: 'component'
            });
            this.props.ViewportAction.setCurrentHoverComponentMapUniqueKey(this.props.mapUniqueKey);
        }
    }, {
        key: "handleClick",
        value: function handleClick(event) {
            event.stopPropagation();
            this.props.ViewportAction.setCurrentEditComponentMapUniqueKey(this.props.mapUniqueKey);
        }
    }, {
        key: "handleMouseDown",
        value: function handleMouseDown(event) {
            if (this.componentInfo.props.style.position === 'gaea-draggable') {
                return;
            }
            this.startDrag = true;
        }
    }, {
        key: "handleMouseMove",
        value: function handleMouseMove(event) {
            if (this.componentInfo.props.style.position === 'gaea-draggable') {
                return;
            }
            if (!this.startDrag) {
                return;
            }
        }
    }, {
        key: "handleMouseUp",
        value: function handleMouseUp(event) {
            if (this.componentInfo.props.style.position === 'gaea-draggable') {
                return;
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var childs = null;
            if (this.componentInfo.props.canDragIn && this.componentInfo.layoutChilds) {
                childs = this.componentInfo.layoutChilds.map(function (layoutChildUniqueMapKey) {
                    return React.createElement(EditHelper_1.ObserveEditHelper, { key: layoutChildUniqueMapKey, mapUniqueKey: layoutChildUniqueMapKey, ref: "edit-" + layoutChildUniqueMapKey });
                });
            }
            var componentProps = JSON.parse(JSON.stringify(this.componentInfo.props));
            delete componentProps.canDragIn;
            delete componentProps.gaeaEdit;
            delete componentProps.gaeaEvent;
            delete componentProps.gaeaEventData;
            delete componentProps.gaeaNativeEventData;
            delete componentProps.gaeaUniqueKey;
            delete componentProps.gaeaVariables;
            componentProps.ref = function (ref) {
                _this2.wrappedInstance = ref;
            };
            componentProps.gaeaPreview = false;
            return React.createElement(this.ComponentClass, componentProps, childs);
        }
    }]);
    return EditHelper;
}(React.Component);
var EditHelper = EditHelper_1;
EditHelper.defaultProps = new typings.Props();
EditHelper.ObserveEditHelper = mobx_react_1.inject('ApplicationStore', 'ViewportStore', 'EventStore', 'ApplicationAction', 'EventAction', 'ViewportAction')(mobx_react_1.observer(EditHelper_1));
__decorate([index_1.autoBindMethod], EditHelper.prototype, "updateDom", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "setDragableClassIfNeed", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "setLayoutClassIfCanDragIn", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "handleMouseOver", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "handleClick", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "handleMouseDown", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "handleMouseMove", null);
__decorate([index_1.autoBindMethod], EditHelper.prototype, "handleMouseUp", null);
EditHelper = EditHelper_1 = __decorate([mobx_react_1.observer(['ApplicationStore', 'ViewportStore', 'EventStore', 'ApplicationAction', 'EventAction', 'ViewportAction'])], EditHelper);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditHelper;