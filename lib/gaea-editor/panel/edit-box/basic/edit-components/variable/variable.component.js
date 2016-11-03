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
var typings = require("./variable.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-button');
var index_2 = require('nt-web-modal');
var index_3 = require('nt-web-tabs');
var index_4 = require('nt-auto-bind');
require("./variable.css");
var EditComponentVariable = function (_React$Component) {
    (0, _inherits3.default)(EditComponentVariable, _React$Component);

    function EditComponentVariable() {
        (0, _classCallCheck3.default)(this, EditComponentVariable);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditComponentVariable.__proto__ || Object.getPrototypeOf(EditComponentVariable)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditComponentVariable, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
        }
    }, {
        key: "handleShowModal",
        value: function handleShowModal() {
            this.setState({
                show: true
            });
        }
    }, {
        key: "handleOk",
        value: function handleOk() {
            this.setState({
                show: false
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
        key: "handleSelectExternalParameter",
        value: function handleSelectExternalParameter(externalParameter) {
            this.props.viewport.addVariable(this.props.viewport.currentEditComponentMapUniqueKey, {
                field: this.props.editOption.field,
                variableType: 'externalParameter',
                valueType: externalParameter.type,
                variableField: externalParameter.name
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var ExternalParameters = this.props.setting.data.externalParameter && this.props.setting.data.externalParameter.map(function (externalParameter, index) {
                return React.createElement("div", { key: index, className: "global-params-item-container" }, React.createElement("div", { className: "global-params-item-container__title" }, externalParameter.name), React.createElement("div", { className: "global-params-item-container__right-container" }, React.createElement("div", { className: "global-params-item-container__right-container__type" }, externalParameter.type), React.createElement("div", { className: "global-params-item-container__right-container__select-container" }, React.createElement(index_1.default, { active: _this2.componentInfo.props.gaeaVariables.findIndex(function (variable) {
                        return variable.variableField === externalParameter.name;
                    }) > -1, onClick: _this2.handleSelectExternalParameter.bind(_this2, externalParameter) }, "选择"))));
            });
            var magicButtonContent = void 0;
            if (this.props.variable !== null) {
                var icon = '';
                switch (this.props.variable.variableType) {
                    case 'externalParameter':
                        icon = 'fa fa-globe';
                        break;
                }
                magicButtonContent = React.createElement("span", null, React.createElement("i", { className: icon }), " ", this.props.variable.variableField);
            }
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-edit_components-variable" }, React.createElement(index_1.default, { onClick: this.handleShowModal }, this.props.variable === null ? React.createElement("span", null, React.createElement("i", { className: "fa fa-magic" }), " 选择变量") : magicButtonContent), React.createElement(index_2.default, { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-edit_components-variable modal", show: this.state.show, title: "选择变量", size: "small", onOk: this.handleOk, onCancel: this.handleCancel }, React.createElement(index_3.Tabs, { defaultActiveKey: "externalParameter" }, React.createElement(index_3.TabPanel, { tab: "全局传参变量", activeKey: "externalParameter" }, ExternalParameters))));
        }
    }]);
    return EditComponentVariable;
}(React.Component);
EditComponentVariable.defaultProps = new typings.Props();
__decorate([index_4.autoBindMethod], EditComponentVariable.prototype, "handleShowModal", null);
__decorate([index_4.autoBindMethod], EditComponentVariable.prototype, "handleOk", null);
__decorate([index_4.autoBindMethod], EditComponentVariable.prototype, "handleCancel", null);
__decorate([index_4.autoBindMethod], EditComponentVariable.prototype, "handleSelectExternalParameter", null);
EditComponentVariable = __decorate([mobx_react_1.inject('viewport', 'application', 'setting'), mobx_react_1.observer], EditComponentVariable);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentVariable;