"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventSystem = function () {
    function EventSystem() {
        (0, _classCallCheck3.default)(this, EventSystem);

        this.events = new Map();
    }

    (0, _createClass3.default)(EventSystem, [{
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
    return EventSystem;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventSystem;