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

var PublishAction = function () {
    function PublishAction() {
        (0, _classCallCheck3.default)(this, PublishAction);

        this.observeClass = true;
    }

    (0, _createClass3.default)(PublishAction, [{
        key: "onInit",
        value: function onInit() {
            this.publish.currentVersion = this.applicationStore.editorProps && this.applicationStore.editorProps.currentVersion;
        }
    }, {
        key: "updateVersion",
        value: function updateVersion(version) {
            this.publish.currentVersion = version;
        }
    }]);
    return PublishAction;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PublishAction;
__decorate([gaea_editor_manager_1.inject('PublishStore')], PublishAction.prototype, "publish", void 0);
__decorate([gaea_editor_manager_1.inject('ApplicationStore')], PublishAction.prototype, "applicationStore", void 0);
__decorate([gaea_editor_manager_1.observable], PublishAction.prototype, "observeClass", void 0);
__decorate([gaea_editor_manager_1.action('修改当前版本')], PublishAction.prototype, "updateVersion", null);