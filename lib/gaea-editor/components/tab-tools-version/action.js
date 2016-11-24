"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

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
var gaea_editor_manager_1 = require("../../../gaea-editor-manager/gaea-editor-manager");

var TabToolsVersionAction = function () {
    function TabToolsVersionAction() {
        (0, _classCallCheck3.default)(this, TabToolsVersionAction);

        this.observeClass = true;
    }

    (0, _createClass3.default)(TabToolsVersionAction, [{
        key: "setCurrentVersionPage",
        value: function setCurrentVersionPage(page) {
            this.tabToolsVersion.currentVersionPage = page;
        }
    }, {
        key: "addVersions",
        value: function addVersions(versions) {
            var _this = this;

            gaea_editor_manager_1.transaction(function () {
                versions && versions.forEach(function (version) {
                    _this.tabToolsVersion.versionList.push(version);
                });
            });
        }
    }, {
        key: "setCurrentVersion",
        value: function setCurrentVersion(version) {
            this.tabToolsVersion.currentVersion = version;
        }
    }, {
        key: "publishToVersionList",
        value: function publishToVersionList(versionInfo) {
            if (this.tabToolsVersion.versionList.length > 0) {
                this.tabToolsVersion.versionList.unshift(versionInfo);
            }
        }
    }]);
    return TabToolsVersionAction;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabToolsVersionAction;
__decorate([gaea_editor_manager_1.inject('TabToolsVersionStore')], TabToolsVersionAction.prototype, "tabToolsVersion", void 0);
__decorate([gaea_editor_manager_1.observable], TabToolsVersionAction.prototype, "observeClass", void 0);
__decorate([gaea_editor_manager_1.action('设置当前版本列表业务')], TabToolsVersionAction.prototype, "setCurrentVersionPage", null);
__decorate([gaea_editor_manager_1.action('添加版本')], TabToolsVersionAction.prototype, "addVersions", null);
__decorate([gaea_editor_manager_1.action('设置当前最新版本号')], TabToolsVersionAction.prototype, "setCurrentVersion", null);
__decorate([gaea_editor_manager_1.action('增加刚刚发布的版本到版本列表中')], TabToolsVersionAction.prototype, "publishToVersionList", null);