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
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require("react");
var typings = require("./publish.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-modal');
var index_2 = require('nt-web-select');
var index_3 = require('nt-auto-bind');
var action_1 = require("./action");
var store_1 = require("./store");
require("./publish.css");
var Publish = function (_React$Component) {
    (0, _inherits3.default)(Publish, _React$Component);

    function Publish() {
        (0, _classCallCheck3.default)(this, Publish);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Publish.__proto__ || Object.getPrototypeOf(Publish)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Publish, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.initVersion();
        }
    }, {
        key: "componentWillReact",
        value: function componentWillReact() {
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
            if (!this.props.PublishStore.currentVersion) {
                nextPatch = '0.0.1';
                nextMinor = '0.1.0';
                nextMajor = '1.0.0';
            } else {
                var versionSplit = this.props.PublishStore.currentVersion.split('.');
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
            var _this2 = this;

            this.setState({
                show: false
            }, function () {
                _this2.props.ApplicationStore.editorProps.onPublish(_this2.state.selectedVersion);
                _this2.props.PublishAction.updateVersion(_this2.state.selectedVersion);
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
                    value: nextPatch + ' 补丁'
                }, {
                    key: nextMinor,
                    value: nextMinor + ' 小版本更新'
                }, {
                    key: nextMajor,
                    value: nextMajor + ' 全新版本'
                }]
            };
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-publish", onClick: this.handleShowModal }, "发布", React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-publish" }, React.createElement(index_1.default, { className: "nt-editor-gaea-editor-gaea_editor-components-publish", show: this.state.show, onOk: this.handleOk.bind(this), title: "发布新版本", onCancel: this.handleCancel.bind(this) }, React.createElement(index_2.default, __assign({ label: "版本号" }, selectOption, { onChange: this.handleSelectChange })))));
        }
    }]);
    return Publish;
}(React.Component);
Publish.defaultProps = new typings.Props();
Publish.position = 'navbarRight';
Publish.Action = action_1.default;
Publish.Store = store_1.default;
__decorate([index_3.autoBindMethod], Publish.prototype, "handleShowModal", null);
__decorate([index_3.autoBindMethod], Publish.prototype, "handleOk", null);
__decorate([index_3.autoBindMethod], Publish.prototype, "handleCancel", null);
__decorate([index_3.autoBindMethod], Publish.prototype, "handleSelectChange", null);
Publish = __decorate([EditorManager.observer(['ApplicationStore', 'PublishStore', 'PublishAction'])], Publish);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Publish;