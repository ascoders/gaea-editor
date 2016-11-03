"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

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
var React = require("react");
var typings = require("./event.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-auto-complete');
require("./event.css");
var Event = function (_React$Component) {
    (0, _inherits3.default)(Event, _React$Component);

    function Event() {
        (0, _classCallCheck3.default)(this, Event);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Event.__proto__ || Object.getPrototypeOf(Event)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Event, [{
        key: "handleChange",
        value: function handleChange(value) {
            this.props.viewport.prepareWriteHistory();
            var eventData = this.props.isWeb ? 'gaeaEventData' : 'gaeaNativeEventData';
            this.props.viewport.updateEventData(this.props.viewport.currentEditComponentMapUniqueKey, eventData + "." + this.props.index + ".eventData.emit", value);
            this.props.viewport.writeHistory();
        }
    }, {
        key: "render",
        value: function render() {
            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
            var customData = this.props.isWeb ? this.componentInfo.props.gaeaEventData[this.props.index].eventData : this.componentInfo.props.gaeaNativeEventData[this.props.index].eventData;
            return React.createElement(index_1.default, { value: customData.emit || '', label: "触发的事件名称", onChange: this.handleChange.bind(this), onSelect: this.handleChange.bind(this) });
        }
    }]);
    return Event;
}(React.Component);
Event.defaultProps = new typings.Props();
Event = __decorate([mobx_react_1.inject('viewport'), mobx_react_1.observer], Event);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Event;