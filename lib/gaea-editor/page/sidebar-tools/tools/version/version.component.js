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
var React = require("react");
var typings = require("./version.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-button');
require("./version.css");
var Version = function (_React$Component) {
    _inherits(Version, _React$Component);

    function Version() {
        _classCallCheck(this, Version);

        var _this = _possibleConstructorReturn(this, (Version.__proto__ || Object.getPrototypeOf(Version)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(Version, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            if (this.props.application.currentVersionPage === 0) {
                this.props.application.setCurrentVersionPage(1);
                this.props.application.event.emit(this.props.application.event.onGetPublishList, this.props.application.currentVersionPage);
            }
        }
    }, {
        key: "handlePreviewVersion",
        value: function handlePreviewVersion(version) {
            this.props.application.event.emit(this.props.application.event.onPreviewVersion, version);
        }
    }, {
        key: "handleSwitchVersion",
        value: function handleSwitchVersion(version) {
            this.props.application.event.emit(this.props.application.event.onSwitchVersion, version);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var Versions = this.props.application.versionList.map(function (version, index) {
                return React.createElement("div", { className: "version-container", key: index }, React.createElement("div", { className: "version-header-container" }, React.createElement("div", { className: "version-title" }, version.version), _this2.props.application.currentVersion === version.version ? React.createElement("div", { className: "current-version-tag" }, "当前版本") : React.createElement(index_1.ButtonGroup, null, React.createElement(index_1.Button, { onClick: _this2.handlePreviewVersion.bind(_this2, version.version) }, "预览"), React.createElement(index_1.Button, { onClick: _this2.handleSwitchVersion.bind(_this2, version.version) }, "切换"))), React.createElement("div", { className: "version-description" }, version.description));
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-sidebar_tools-tools-version" }, Versions);
        }
    }]);

    return Version;
}(React.Component);
Version.defaultProps = new typings.Props();
Version = __decorate([mobx_react_1.inject('application'), mobx_react_1.observer], Version);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Version;