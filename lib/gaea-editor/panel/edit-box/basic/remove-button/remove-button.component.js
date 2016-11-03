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
var typings = require("./remove-button.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-button');
var index_2 = require('nt-web-modal');
var index_3 = require('nt-auto-bind');
var RemoveButton = function (_React$Component) {
    (0, _inherits3.default)(RemoveButton, _React$Component);

    function RemoveButton() {
        (0, _classCallCheck3.default)(this, RemoveButton);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RemoveButton.__proto__ || Object.getPrototypeOf(RemoveButton)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(RemoveButton, [{
        key: "handleShowModalOrClick",
        value: function handleShowModalOrClick() {
            if (this.props.setting.data.confirmWhenRemoveComponent) {
                this.setState({
                    show: true
                });
            } else {
                this.handleOk();
            }
        }
    }, {
        key: "handleOk",
        value: function handleOk() {
            var currentEditComponentMapUniqueKey = this.props.viewport.currentEditComponentMapUniqueKey;
            this.props.viewport.deleteComponentByMapUniqueKeyWithHistory(currentEditComponentMapUniqueKey);
        }
    }, {
        key: "handleCancel",
        value: function handleCancel() {
            this.setState({
                show: false
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(index_1.default, { type: "secondary", onClick: this.handleShowModalOrClick }, "移除", React.createElement(index_2.default, { show: this.state.show, onOk: this.handleOk, onCancel: this.handleCancel }, React.createElement("p", null, "是否要移除此组件?")));
        }
    }]);
    return RemoveButton;
}(React.Component);
RemoveButton.defaultProps = new typings.Props();
__decorate([index_3.autoBindMethod], RemoveButton.prototype, "handleShowModalOrClick", null);
__decorate([index_3.autoBindMethod], RemoveButton.prototype, "handleOk", null);
__decorate([index_3.autoBindMethod], RemoveButton.prototype, "handleCancel", null);
RemoveButton = __decorate([mobx_react_1.inject('viewport', 'setting'), mobx_react_1.observer], RemoveButton);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RemoveButton;