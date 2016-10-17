"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var event_system_1 = require("../event-system/event-system");

var EventSystem = function (_event_system_1$defau) {
    _inherits(EventSystem, _event_system_1$defau);

    function EventSystem() {
        _classCallCheck(this, EventSystem);

        var _this = _possibleConstructorReturn(this, (EventSystem.__proto__ || Object.getPrototypeOf(EventSystem)).apply(this, arguments));

        _this.viewportOrTreeComponentMouseOver = 'viewportOrTreeComponentMouseOver';
        _this.viewportOrTreeRootComponentMouseLeave = 'viewportOrTreeRootComponentMouseLeave';
        _this.changeComponentSelectStatusEvent = 'changeComponentSelectStatus';
        _this.onSave = 'onSave';
        _this.onGetPublishList = 'onGetPublishList';
        _this.onPreviewVersion = 'onPreviewVersion';
        _this.onSwitchVersion = 'onSwitchVersion';
        _this.onPublish = 'onPublish';
        _this.editorPanelShadowClose = 'editorPanelShadowClose';
        _this.settingShadowClose = 'settingShadowClose';
        return _this;
    }

    return EventSystem;
}(event_system_1.default);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventSystem;