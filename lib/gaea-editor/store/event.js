"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var event_system_1 = require("../event-system/event-system");

var EventSystem = function (_event_system_1$defau) {
    (0, _inherits3.default)(EventSystem, _event_system_1$defau);

    function EventSystem() {
        (0, _classCallCheck3.default)(this, EventSystem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EventSystem.__proto__ || Object.getPrototypeOf(EventSystem)).apply(this, arguments));

        _this.viewportOrTreeComponentMouseOver = 'viewportOrTreeComponentMouseOver';
        _this.viewportOrTreeRootComponentMouseLeave = 'viewportOrTreeRootComponentMouseLeave';
        _this.changeComponentSelectStatusEvent = 'changeComponentSelectStatus';
        _this.onSave = 'onSave';
        _this.onGetPublishList = 'onGetPublishList';
        _this.onPreviewVersion = 'onPreviewVersion';
        _this.onSwitchVersion = 'onSwitchVersion';
        _this.onPublish = 'onPublish';
        return _this;
    }

    return EventSystem;
}(event_system_1.default);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventSystem;