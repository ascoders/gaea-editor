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
var mobx_1 = require("mobx");

var ViewportStore = function () {
    function ViewportStore() {
        (0, _classCallCheck3.default)(this, ViewportStore);

        this.components = mobx_1.map();
        this.componentDomInstances = new Map();
        this.rootMapUniqueKey = null;
        this.viewportDom = null;
        this.currentHoverComponentMapUniqueKey = null;
        this.currentEditComponentMapUniqueKey = null;
        this.showEditComponents = false;
        this.isLayoutComponentActive = false;
        this.currentDragComponentInfo = null;
    }

    (0, _createClass3.default)(ViewportStore, [{
        key: "currentHoverComponentDom",
        get: function get() {
            return this.componentDomInstances.get(this.currentHoverComponentMapUniqueKey);
        }
    }, {
        key: "currentEditComponentInfo",
        get: function get() {
            return this.components.get(this.currentEditComponentMapUniqueKey);
        }
    }, {
        key: "currentEditComponentPath",
        get: function get() {
            var finderPath = [this.currentEditComponentMapUniqueKey];
            if (this.currentEditComponentMapUniqueKey === null) {
                return [];
            }
            var nowComponent = this.components.get(this.currentEditComponentMapUniqueKey);
            if (nowComponent.parentMapUniqueKey === null) {
                return [this.rootMapUniqueKey];
            }
            while (this.components.get(nowComponent.parentMapUniqueKey).parentMapUniqueKey !== null) {
                finderPath.unshift(nowComponent.parentMapUniqueKey);
                nowComponent = this.components.get(nowComponent.parentMapUniqueKey);
            }
            finderPath.unshift(this.rootMapUniqueKey);
            return finderPath;
        }
    }]);
    return ViewportStore;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewportStore;
__decorate([mobx_1.observable], ViewportStore.prototype, "components", void 0);
__decorate([mobx_1.observable], ViewportStore.prototype, "rootMapUniqueKey", void 0);
__decorate([mobx_1.observable], ViewportStore.prototype, "currentHoverComponentMapUniqueKey", void 0);
__decorate([mobx_1.computed], ViewportStore.prototype, "currentHoverComponentDom", null);
__decorate([mobx_1.observable], ViewportStore.prototype, "currentEditComponentMapUniqueKey", void 0);
__decorate([mobx_1.computed], ViewportStore.prototype, "currentEditComponentInfo", null);
__decorate([mobx_1.observable], ViewportStore.prototype, "showEditComponents", void 0);
__decorate([mobx_1.observable], ViewportStore.prototype, "isLayoutComponentActive", void 0);
__decorate([mobx_1.observable], ViewportStore.prototype, "currentDragComponentInfo", void 0);
__decorate([mobx_1.computed], ViewportStore.prototype, "currentEditComponentPath", null);