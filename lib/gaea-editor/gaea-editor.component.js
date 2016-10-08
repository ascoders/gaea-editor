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
var typings = require('./gaea-editor.type');
var mobx_react_1 = require('mobx-react');
var application_1 = require('./store/application');
var viewport_1 = require('./store/viewport');
var setting_1 = require('./store/setting');
var page_component_1 = require('./page/page.component');
var GaeaEditor = function (_React$Component) {
    _inherits(GaeaEditor, _React$Component);

    function GaeaEditor() {
        var _ref;

        _classCallCheck(this, GaeaEditor);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = GaeaEditor.__proto__ || Object.getPrototypeOf(GaeaEditor)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        _this.applicationStore = new application_1.default();
        _this.viewport = new viewport_1.default(_this.applicationStore);
        _this.setting = new setting_1.default();
        _this.handleOnSaveBind = _this.handleOnSave.bind(_this);
        return _this;
    }

    _createClass(GaeaEditor, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.setPropsToApplication.call(this, this.props);
            this.addListener.call(this);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.removeListener.call(this);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setPropsToApplication.call(this, nextProps);
            this.forceUpdate();
        }
    }, {
        key: "setPropsToApplication",
        value: function setPropsToApplication(props) {
            this.applicationStore.setInitPropsToApplication({
                title: props.title,
                baseComponents: props.baseComponents,
                customComponents: props.customComponents,
                isHideCustomComponents: props.isHideCustomComponents,
                height: props.height,
                defaultValue: props.defaultValue,
                isReactNative: props.isReactNative
            });
        }
    }, {
        key: "getRootRef",
        value: function getRootRef(ref) {
            this.viewport.setRootDomInstance(ReactDOM.findDOMNode(ref));
        }
    }, {
        key: "addListener",
        value: function addListener() {
            this.applicationStore.event.on(this.applicationStore.event.onSave, this.handleOnSaveBind);
        }
    }, {
        key: "removeListener",
        value: function removeListener() {
            this.applicationStore.event.off(this.applicationStore.event.onSave, this.handleOnSaveBind);
        }
    }, {
        key: "handleOnSave",
        value: function handleOnSave(context, componentsInfo) {
            this.props.onSave(componentsInfo);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(mobx_react_1.Provider, { application: this.applicationStore, viewport: this.viewport, setting: this.setting }, React.createElement("div", { ref: this.getRootRef.bind(this) }, React.createElement(page_component_1.default, null)));
        }
    }]);

    return GaeaEditor;
}(React.Component);
GaeaEditor.defaultProps = new typings.Props();
GaeaEditor = __decorate([mobx_react_1.observer], GaeaEditor);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GaeaEditor;