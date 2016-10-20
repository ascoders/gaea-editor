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
var typings = require("./gaea-editor.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-auto-bind');
var application_1 = require("./store/application");
var viewport_1 = require("./store/viewport");
var setting_1 = require("./store/setting");
var page_component_1 = require("./page/page.component");
var GaeaEditor = function (_React$Component) {
    (0, _inherits3.default)(GaeaEditor, _React$Component);

    function GaeaEditor() {
        (0, _classCallCheck3.default)(this, GaeaEditor);

        var _this = (0, _possibleConstructorReturn3.default)(this, (GaeaEditor.__proto__ || Object.getPrototypeOf(GaeaEditor)).apply(this, arguments));

        _this.state = new typings.State();
        _this.application = new application_1.default();
        _this.viewport = new viewport_1.default(_this.application);
        _this.setting = new setting_1.default();
        return _this;
    }

    (0, _createClass3.default)(GaeaEditor, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.setPropsToApplication.call(this, this.props);
            this.addListener.call(this);
            this.setState({
                value: this.props.defaultValue
            });
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
            this.application.setInitPropsToApplication(props);
            this.setting.setDefaultSetting(props.defaultSetting);
        }
    }, {
        key: "getRootRef",
        value: function getRootRef(ref) {
            this.viewport.setRootDomInstance(ReactDOM.findDOMNode(ref));
        }
    }, {
        key: "addListener",
        value: function addListener() {
            this.application.event.on(this.application.event.onSave, this.handleOnSave);
            this.application.event.on(this.application.event.onGetPublishList, this.handleOnGetPublishList);
            this.application.event.on(this.application.event.onSwitchVersion, this.handleOnSwitchVersion);
            this.application.event.on(this.application.event.onPublish, this.handleOnPublish);
            this.application.event.on(this.application.event.onPreviewVersion, this.handleOnPreviewVersion);
        }
    }, {
        key: "removeListener",
        value: function removeListener() {
            this.application.event.off(this.application.event.onSave, this.handleOnSave);
            this.application.event.off(this.application.event.onGetPublishList, this.handleOnGetPublishList);
            this.application.event.off(this.application.event.onSwitchVersion, this.handleOnSwitchVersion);
            this.application.event.off(this.application.event.onPublish, this.handleOnPublish);
            this.application.event.off(this.application.event.onPreviewVersion, this.handleOnPreviewVersion);
        }
    }, {
        key: "handleOnSave",
        value: function handleOnSave(context, componentsInfo) {
            this.props.onSave(componentsInfo, this.setting.getZipSettingData());
        }
    }, {
        key: "handleOnGetPublishList",
        value: function handleOnGetPublishList(context, page) {
            var _this2 = this;

            this.props.onGetPublishList(page, function (result) {
                _this2.application.addVersions(result);
            });
        }
    }, {
        key: "handleOnPublish",
        value: function handleOnPublish(context, versionInfo) {
            var _this3 = this;

            this.props.onPublish(versionInfo, function () {
                _this3.application.setCurrentVersion(versionInfo.version);
                _this3.application.publishToVersionList(versionInfo);
            });
        }
    }, {
        key: "handleOnPreviewVersion",
        value: function handleOnPreviewVersion(context, version) {
            var _this4 = this;

            this.props.onPreviewVersion(version, function (content) {
                _this4.setState({
                    value: content,
                    currentVersion: version
                });
            });
        }
    }, {
        key: "handleOnSwitchVersion",
        value: function handleOnSwitchVersion(context, version) {
            var _this5 = this;

            this.props.onSwitchVersion(version, function (content) {
                _this5.application.setCurrentVersion(version);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(mobx_react_1.Provider, { application: this.application, viewport: this.viewport, setting: this.setting }, React.createElement(page_component_1.default, { key: this.state.currentVersion, ref: this.getRootRef, value: this.state.value }));
        }
    }]);
    return GaeaEditor;
}(React.Component);
GaeaEditor.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], GaeaEditor.prototype, "getRootRef", null);
__decorate([index_1.autoBindMethod], GaeaEditor.prototype, "handleOnSave", null);
__decorate([index_1.autoBindMethod], GaeaEditor.prototype, "handleOnGetPublishList", null);
__decorate([index_1.autoBindMethod], GaeaEditor.prototype, "handleOnPublish", null);
__decorate([index_1.autoBindMethod], GaeaEditor.prototype, "handleOnPreviewVersion", null);
__decorate([index_1.autoBindMethod], GaeaEditor.prototype, "handleOnSwitchVersion", null);
GaeaEditor = __decorate([mobx_react_1.observer], GaeaEditor);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GaeaEditor;