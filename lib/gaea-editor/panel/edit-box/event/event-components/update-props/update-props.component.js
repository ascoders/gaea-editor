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
var typings = require("./update-props.type");
var mobx_react_1 = require("mobx-react");
var _ = require("lodash");
var index_1 = require('nt-web-button');
require("./update-props.css");
var UpdatePropsEvent = function (_React$Component) {
    (0, _inherits3.default)(UpdatePropsEvent, _React$Component);

    function UpdatePropsEvent() {
        (0, _classCallCheck3.default)(this, UpdatePropsEvent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UpdatePropsEvent.__proto__ || Object.getPrototypeOf(UpdatePropsEvent)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(UpdatePropsEvent, [{
        key: "handleClick",
        value: function handleClick() {
            var eventData = this.props.isWeb ? 'gaeaEventData' : 'gaeaNativeEventData';
            if (this.props.viewport.currentEditPropsIndex !== this.props.index) {
                var customData = this.props.isWeb ? this.componentInfo.props.gaeaEventData[this.props.index].eventData : this.componentInfo.props.gaeaNativeEventData[this.props.index].eventData;
                if (!customData || !customData.props) {
                    var cleanProps = this.props.application.cleanComponentProps(this.componentInfo.props);
                    this.props.viewport.updateComponentValueWithNoHistory(eventData + "." + this.props.index + ".eventData.props", cleanProps);
                    this.props.viewport.setCurrentEditPropsIndex(this.props.index, _.cloneDeep(cleanProps), this.props.isWeb, this.props.index);
                } else {
                    this.props.viewport.setCurrentEditPropsIndex(this.props.index, JSON.parse(JSON.stringify(customData.props)), this.props.isWeb, this.props.index);
                }
            } else {
                var _cleanProps = this.props.application.cleanComponentProps(this.componentInfo.props);
                this.props.viewport.updateComponentValueWithNoHistory(eventData + "." + this.props.index + ".eventData.props", _cleanProps);
                this.props.viewport.setCurrentEditPropsIndex(null);
            }
        }
    }, {
        key: "render",
        value: function render() {
            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-event-event_components-update_props" }, React.createElement(index_1.Button, { active: this.props.viewport.currentEditPropsIndex === this.props.index, onClick: this.handleClick.bind(this) }, React.createElement("i", { className: "fa fa-pencil", style: { marginRight: 5 } }), "修改属性"));
        }
    }]);
    return UpdatePropsEvent;
}(React.Component);
UpdatePropsEvent.defaultProps = new typings.Props();
UpdatePropsEvent = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], UpdatePropsEvent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UpdatePropsEvent;