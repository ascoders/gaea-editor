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
var mobx_1 = require("mobx");

var EventStore = function EventStore() {
    (0, _classCallCheck3.default)(this, EventStore);

    this.mouseLeaveViewport = 'mouseLeaveViewport';
    this.mouseHoveringComponent = 'mouseHoveringComponent';
    this.viewportUpdated = 'viewportUpdated';
    this.viewportDomUpdate = 'viewportDomUpdate';
};

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventStore;
__decorate([mobx_1.observable], EventStore.prototype, "mouseLeaveViewport", void 0);
__decorate([mobx_1.observable], EventStore.prototype, "mouseHoveringComponent", void 0);
__decorate([mobx_1.observable], EventStore.prototype, "viewportUpdated", void 0);
__decorate([mobx_1.observable], EventStore.prototype, "viewportDomUpdate", void 0);