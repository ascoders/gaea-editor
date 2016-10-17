"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require("react");
var typings = require("./publish.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-modal');
var index_2 = require('nt-web-select');
var index_3 = require('nt-auto-bind');
require("./publish.css");
var Publish = function (_React$Component) {
    _inherits(Publish, _React$Component);

    function Publish() {
        _classCallCheck(this, Publish);

        var _this = _possibleConstructorReturn(this, (Publish.__proto__ || Object.getPrototypeOf(Publish)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(Publish, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.initVersion();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps() {
            this.initVersion();
        }
    }, {
        key: "initVersion",
        value: function initVersion() {
            var _getNextVersion = this.getNextVersion();

            var nextPatch = _getNextVersion.nextPatch;

            this.setState({
                selectedVersion: nextPatch
            });
        }
    }, {
        key: "getNextVersion",
        value: function getNextVersion() {
            var nextPatch = '';
            var nextMinor = '';
            var nextMajor = '';
            if (!this.props.application.currentVersion) {
                nextPatch = '0.0.1';
                nextMinor = '0.1.0';
                nextMajor = '1.0.0';
            } else {
                var versionSplit = this.props.application.currentVersion.split('.');
                if (versionSplit.length !== 3) {
                    return null;
                }
                nextPatch = versionSplit[0] + "." + versionSplit[1] + "." + (parseInt(versionSplit[2]) + 1);
                nextMinor = versionSplit[0] + "." + (parseInt(versionSplit[1]) + 1) + ".0";
                nextMajor = parseInt(versionSplit[0]) + 1 + ".0.0";
            }
            return { nextPatch: nextPatch, nextMinor: nextMinor, nextMajor: nextMajor };
        }
    }, {
        key: "handleShowModal",
        value: function handleShowModal() {
            this.setState({
                show: true
            });
        }
    }, {
        key: "handleOk",
        value: function handleOk() {
            this.setState({
                show: false
            });
            this.props.application.event.emit(this.props.application.event.onPublish, {
                version: this.state.selectedVersion,
                description: ''
            });
        }
    }, {
        key: "handleCancel",
        value: function handleCancel() {
            this.setState({
                show: false
            });
        }
    }, {
        key: "handleSelectChange",
        value: function handleSelectChange(version) {
            this.setState({
                selectedVersion: version
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _getNextVersion2 = this.getNextVersion();

            var nextPatch = _getNextVersion2.nextPatch;
            var nextMinor = _getNextVersion2.nextMinor;
            var nextMajor = _getNextVersion2.nextMajor;

            var selectOption = {
                value: nextPatch,
                options: [{
                    key: nextPatch,
                    value: nextPatch
                }, {
                    key: nextMinor,
                    value: nextMinor
                }, {
                    key: nextMajor,
                    value: nextMajor
                }]
            };
            return React.createElement("div", { className: "menu-item", onClick: this.handleShowModal }, "发布", React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-header-publish" }, React.createElement(index_1.default, { className: "nt-editor-gaea-editor-gaea_editor-page-header-publish", show: this.state.show, onOk: this.handleOk.bind(this), title: "发布新版本", onCancel: this.handleCancel.bind(this) }, React.createElement(index_2.default, __assign({ label: "版本号" }, selectOption, { onChange: this.handleSelectChange })))));
        }
    }]);

    return Publish;
}(React.Component);
Publish.defaultProps = new typings.Props();
__decorate([index_3.autoBindMethod], Publish.prototype, "handleShowModal", null);
__decorate([index_3.autoBindMethod], Publish.prototype, "handleOk", null);
__decorate([index_3.autoBindMethod], Publish.prototype, "handleCancel", null);
__decorate([index_3.autoBindMethod], Publish.prototype, "handleSelectChange", null);
Publish = __decorate([mobx_react_1.inject('setting', 'application', 'viewport'), mobx_react_1.observer], Publish);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Publish;