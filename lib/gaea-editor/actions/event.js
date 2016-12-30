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

var EventAction = function () {
    function EventAction() {
        (0, _classCallCheck3.default)(this, EventAction);

        this.events = new Map();
        this.observableClass = true;
    }

    (0, _createClass3.default)(EventAction, [{
        key: "on",
        value: function on(eventType, callback, context) {
            var event = {
                callback: callback,
                context: context
            };
            if (this.events.get(eventType)) {
                this.events.get(eventType).push(event);
            } else {
                this.events.set(eventType, [event]);
            }
        }
    }, {
        key: "off",
        value: function off(eventType, callback) {
            if (!this.events.get(eventType)) {
                return false;
            }
            var events = this.events.get(eventType).filter(function (event) {
                return event.callback !== callback;
            });
            this.events.set(eventType, events);
            return true;
        }
    }, {
        key: "emit",
        value: function emit(eventType, context) {
            if (!eventType || !this.events.get(eventType)) {
                return false;
            }
            this.events.get(eventType).forEach(function (event) {
                event.callback(event.context, context);
            });
        }
    }]);
    return EventAction;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventAction;
__decorate([mobx_1.observable], EventAction.prototype, "observableClass", void 0);