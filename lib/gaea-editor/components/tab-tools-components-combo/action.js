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
var LZString = require("lz-string");

var TabToolsComponentsComboAction = function () {
    function TabToolsComponentsComboAction() {
        (0, _classCallCheck3.default)(this, TabToolsComponentsComboAction);

        this.observeClass = true;
    }

    (0, _createClass3.default)(TabToolsComponentsComboAction, [{
        key: "addCombo",
        value: function addCombo(name, info) {
            this.tabToolsComponentsCombo.comboList.push({
                name: name,
                source: LZString.compressToBase64(JSON.stringify(info))
            });
        }
    }]);
    return TabToolsComponentsComboAction;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabToolsComponentsComboAction;
__decorate([gaea_editor_manager_1.inject('TabToolsComponentsComboStore')], TabToolsComponentsComboAction.prototype, "tabToolsComponentsCombo", void 0);
__decorate([gaea_editor_manager_1.observable], TabToolsComponentsComboAction.prototype, "observeClass", void 0);
__decorate([gaea_editor_manager_1.action('添加一个模板')], TabToolsComponentsComboAction.prototype, "addCombo", null);