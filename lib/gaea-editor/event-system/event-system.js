"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventSystem = function () {
    function EventSystem() {
        _classCallCheck(this, EventSystem);

        this.events = new Map();
    }

    _createClass(EventSystem, [{
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
            this.events.get(eventType).filter(function (event) {
                return event.callback !== callback;
            });
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

    return EventSystem;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventSystem;
//# sourceMappingURL=event-system.js.map