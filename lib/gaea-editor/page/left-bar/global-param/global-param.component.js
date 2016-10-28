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
var typings = require("./global-param.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-modal');
var index_2 = require('nt-web-button');
var index_3 = require('nt-web-input');
var index_4 = require('nt-web-message');
var index_5 = require('nt-web-select');
var index_6 = require('nt-auto-bind');
require("./global-param.css");
var GlobalParam = function (_React$Component) {
    (0, _inherits3.default)(GlobalParam, _React$Component);

    function GlobalParam() {
        (0, _classCallCheck3.default)(this, GlobalParam);

        var _this = (0, _possibleConstructorReturn3.default)(this, (GlobalParam.__proto__ || Object.getPrototypeOf(GlobalParam)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(GlobalParam, [{
        key: "handleShowModal",
        value: function handleShowModal() {
            this.setState({
                show: true
            });
        }
    }, {
        key: "handleOk",
        value: function handleOk() {
            var _this2 = this;

            if (this.state.name === '') {
                return index_4.default.error('变量名不能为空');
            }
            this.setState({
                show: false
            }, function () {
                _this2.props.setting.addGlobalParam({
                    name: _this2.state.name,
                    type: _this2.state.type
                });
                _this2.setState({
                    name: '',
                    type: 'number'
                });
            });
        }
    }, {
        key: "handleCancel",
        value: function handleCancel() {
            this.setState({
                show: false
            });
        }
    }, {
        key: "handleChangeName",
        value: function handleChangeName(name) {
            this.setState({
                name: name
            });
        }
    }, {
        key: "handleChangeType",
        value: function handleChangeType(type) {
            this.setState({
                type: type
            });
        }
    }, {
        key: "handleDelete",
        value: function handleDelete(index) {
            this.props.setting.removeGlobalParam(index);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var items = this.props.setting.data.globalParams.map(function (param, index) {
                return React.createElement("div", { className: "global-param", key: index }, React.createElement("div", { className: "global-param__name-container" }, React.createElement("div", { className: "global-param__name-container__name" }, param.name), React.createElement("div", { className: "global-param__name-container__type" }, param.type)), React.createElement("div", { className: "global-param__delete", onClick: _this3.handleDelete.bind(_this3, index) }, React.createElement("i", { className: "fa fa-close" })));
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-left_bar-global_param" }, items, React.createElement(index_2.default, { className: "add-param", onClick: this.handleShowModal }, "新增传参变量名"), React.createElement(index_1.default, { className: "nt-editor-gaea-editor-gaea_editor-page-left_bar-global_param", title: "新增传参变量名", show: this.state.show, onOk: this.handleOk, onCancel: this.handleCancel }, React.createElement(index_3.default, { label: "变量名", onChange: this.handleChangeName, value: this.state.name }), React.createElement(index_5.Select, { label: "类型", onChange: this.handleChangeType, value: this.state.type }, React.createElement(index_5.Option, { value: "number" }, "Number"), React.createElement(index_5.Option, { value: "string" }, "String"), React.createElement(index_5.Option, { value: "boolean" }, "Boolean"))));
        }
    }]);
    return GlobalParam;
}(React.Component);
GlobalParam.defaultProps = new typings.Props();
__decorate([index_6.autoBindMethod], GlobalParam.prototype, "handleShowModal", null);
__decorate([index_6.autoBindMethod], GlobalParam.prototype, "handleOk", null);
__decorate([index_6.autoBindMethod], GlobalParam.prototype, "handleCancel", null);
__decorate([index_6.autoBindMethod], GlobalParam.prototype, "handleChangeName", null);
__decorate([index_6.autoBindMethod], GlobalParam.prototype, "handleChangeType", null);
__decorate([index_6.autoBindMethod], GlobalParam.prototype, "handleDelete", null);
GlobalParam = __decorate([mobx_react_1.inject('setting', 'viewport', 'application'), mobx_react_1.observer], GlobalParam);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GlobalParam;