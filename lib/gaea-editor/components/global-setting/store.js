"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

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

var GlobalSettingStore = function GlobalSettingStore() {
    (0, _classCallCheck3.default)(this, GlobalSettingStore);

    this.confirmWhenRemoveComponent = true;
    this.showLayout = true;
    this.backgroundColor = 'transparent';
    this.viewportWidth = 100;
    this.viewportHeight = 100;
    this.fitInWeb = 'pc';
    this.externalParameter = [];
    this.showTimeStart = null;
    this.showTimeEnd = null;
    this.showTimeStartDate = '';
    this.showTimeStartTime = '';
    this.showTimeEndDate = '';
    this.showTimeEndTime = '';
};

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GlobalSettingStore;
__decorate([gaea_editor_manager_1.observable], GlobalSettingStore.prototype, "confirmWhenRemoveComponent", void 0);
__decorate([gaea_editor_manager_1.observable], GlobalSettingStore.prototype, "showLayout", void 0);
__decorate([gaea_editor_manager_1.observable], GlobalSettingStore.prototype, "backgroundColor", void 0);
__decorate([gaea_editor_manager_1.observable], GlobalSettingStore.prototype, "viewportWidth", void 0);
__decorate([gaea_editor_manager_1.observable], GlobalSettingStore.prototype, "viewportHeight", void 0);
__decorate([gaea_editor_manager_1.observable], GlobalSettingStore.prototype, "fitInWeb", void 0);
__decorate([gaea_editor_manager_1.observable], GlobalSettingStore.prototype, "externalParameter", void 0);
__decorate([gaea_editor_manager_1.observable], GlobalSettingStore.prototype, "showTimeStart", void 0);
__decorate([gaea_editor_manager_1.observable], GlobalSettingStore.prototype, "showTimeEnd", void 0);