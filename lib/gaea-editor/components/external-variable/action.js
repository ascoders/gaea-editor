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

var ExternalVariableAction = function () {
    function ExternalVariableAction() {
        (0, _classCallCheck3.default)(this, ExternalVariableAction);

        this.observeClass = true;
    }

    (0, _createClass3.default)(ExternalVariableAction, [{
        key: "addExternalParameter",
        value: function addExternalParameter(externalParameter) {
            this.globalSettingStore.externalParameter.push(externalParameter);
        }
    }, {
        key: "removeExternalParameter",
        value: function removeExternalParameter(index) {
            this.globalSettingStore.externalParameter.splice(index, 1);
        }
    }]);
    return ExternalVariableAction;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExternalVariableAction;
__decorate([gaea_editor_manager_1.inject('ExternalVariableStore')], ExternalVariableAction.prototype, "externalVariableStore", void 0);
__decorate([gaea_editor_manager_1.inject('GlobalSettingStore')], ExternalVariableAction.prototype, "globalSettingStore", void 0);
__decorate([gaea_editor_manager_1.observable], ExternalVariableAction.prototype, "observeClass", void 0);
__decorate([gaea_editor_manager_1.action('增加外部传参')], ExternalVariableAction.prototype, "addExternalParameter", null);
__decorate([gaea_editor_manager_1.action('删除外部传参')], ExternalVariableAction.prototype, "removeExternalParameter", null);