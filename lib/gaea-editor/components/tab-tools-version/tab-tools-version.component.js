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
var typings = require("./tab-tools-version.type");
var action_1 = require("./action");
var store_1 = require("./store");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-button');
require("./tab-tools-version.css");
var TabToolsVersion = function (_React$Component) {
    (0, _inherits3.default)(TabToolsVersion, _React$Component);

    function TabToolsVersion() {
        (0, _classCallCheck3.default)(this, TabToolsVersion);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TabToolsVersion.__proto__ || Object.getPrototypeOf(TabToolsVersion)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(TabToolsVersion, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            if (this.props.TabToolsVersionStore.currentVersionPage === 0) {
                this.props.TabToolsVersionAction.setCurrentVersionPage(1);
                this.props.ApplicationStore.editorProps.onGetPublishList(this.props.TabToolsVersionStore.currentVersionPage, function (result) {
                    _this2.props.TabToolsVersionAction.addVersions(result);
                });
            }
        }
    }, {
        key: "handlePreviewVersion",
        value: function handlePreviewVersion(version) {
            var _this3 = this;

            this.props.ApplicationStore.editorProps.onPreviewVersion(version, function (content) {
                _this3.props.ApplicationAction.updatePage(content);
            });
        }
    }, {
        key: "handleSwitchVersion",
        value: function handleSwitchVersion(version) {
            var _this4 = this;

            this.props.ApplicationStore.editorProps.onSwitchVersion(version, function (content) {
                _this4.props.TabToolsVersionAction.setCurrentVersion(version);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            var Versions = this.props.TabToolsVersionStore.versionList.map(function (version, index) {
                return React.createElement("div", { className: "version-container", key: index }, React.createElement("div", { className: "version-header-container" }, React.createElement("div", { className: "version-title" }, version.version), _this5.props.TabToolsVersionStore.currentVersion === version.version ? React.createElement("div", { className: "current-version-tag" }, "当前版本") : React.createElement(index_1.ButtonGroup, null, React.createElement(index_1.Button, { onClick: _this5.handlePreviewVersion.bind(_this5, version.version) }, "预览"), React.createElement(index_1.Button, { onClick: _this5.handleSwitchVersion.bind(_this5, version.version) }, "切换"))), React.createElement("div", { className: "version-description" }, version.description));
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-tab_tools_version" }, Versions);
        }
    }]);
    return TabToolsVersion;
}(React.Component);
TabToolsVersion.defaultProps = new typings.Props();
TabToolsVersion.position = 'tabToolsVersion';
TabToolsVersion.Action = action_1.default;
TabToolsVersion.Store = store_1.default;
TabToolsVersion = __decorate([EditorManager.observer(['TabToolsVersionStore', 'ApplicationStore', 'ApplicationAction', 'TabToolsVersionAction'])], TabToolsVersion);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabToolsVersion;