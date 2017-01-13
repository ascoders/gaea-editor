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
var typings = require("./external-variable-editor.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-button');
var index_3 = require('nt-web-modal');
var index_4 = require('nt-web-tabs');
var action_1 = require("./action");
var store_1 = require("./store");
require("./external-variable-editor.css");
var ExternalVariableEditor = function (_React$Component) {
    (0, _inherits3.default)(ExternalVariableEditor, _React$Component);

    function ExternalVariableEditor() {
        (0, _classCallCheck3.default)(this, ExternalVariableEditor);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ExternalVariableEditor.__proto__ || Object.getPrototypeOf(ExternalVariableEditor)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(ExternalVariableEditor, [{
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
            this.props.ExternalVariableEditorAction.setCurrentEditComponentVariableByField(this.props.editInfo.field, {
                variableType: 'externalParameter',
                valueType: externalParameter.type,
                variableField: externalParameter.name
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var variable = this.props.ExternalVariableEditorStore.variables.get(this.props.ViewportStore.currentEditComponentMapUniqueKey + '_' + this.props.editInfo.field);
            if (variable === undefined) {
                return null;
            }
            var ExternalParameters = this.props.ExternalVariableStore.externalParameter.map(function (externalParameter, index) {
                return React.createElement("div", { key: index, className: "global-params-item-container" }, React.createElement("div", { className: "global-params-item-container__title" }, externalParameter.name), React.createElement("div", { className: "global-params-item-container__right-container" }, React.createElement("div", { className: "global-params-item-container__right-container__type" }, externalParameter.type), React.createElement("div", { className: "global-params-item-container__right-container__select-container" }, React.createElement(index_2.Button, { active: variable && variable.variableField === externalParameter.name, onClick: _this2.handleSelectExternalParameter.bind(_this2, externalParameter) }, "选择"))));
            });
            var magicButtonContent = void 0;
            if (variable !== null) {
                var icon = '';
                switch (variable.variableType) {
                    case 'externalParameter':
                        icon = 'fa fa-globe';
                        break;
                }
                magicButtonContent = React.createElement("span", null, React.createElement("i", { className: icon }), " ", variable.variableField);
            }
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-external_variable_editor" }, React.createElement(index_2.Button, { onClick: this.handleShowModal }, variable === null ? React.createElement("span", null, React.createElement("i", { className: "fa fa-magic" }), " 选择变量") : magicButtonContent), React.createElement(index_3.Modal, { className: "nt-editor-gaea-editor-gaea_editor-components-external_variable_editor modal", show: this.state.show, title: "选择变量", size: "small", onOk: this.handleOk, onCancel: this.handleCancel }, React.createElement(index_4.Tabs, { defaultActiveKey: "externalParameter" }, React.createElement(index_4.TabPanel, { tab: "全局传参变量", activeKey: "externalParameter" }, ExternalParameters))));
        }
    }]);
    return ExternalVariableEditor;
}(React.Component);
ExternalVariableEditor.defaultProps = new typings.Props();
ExternalVariableEditor.position = 'editorTool';
ExternalVariableEditor.Action = action_1.default;
ExternalVariableEditor.Store = store_1.default;
__decorate([index_1.autoBindMethod], ExternalVariableEditor.prototype, "handleShowModal", null);
__decorate([index_1.autoBindMethod], ExternalVariableEditor.prototype, "handleOk", null);
__decorate([index_1.autoBindMethod], ExternalVariableEditor.prototype, "handleCancel", null);
__decorate([index_1.autoBindMethod], ExternalVariableEditor.prototype, "handleSelectExternalParameter", null);
ExternalVariableEditor = __decorate([EditorManager.observer(['ViewportStore', 'ExternalVariableEditorAction', 'ExternalVariableEditorStore', 'ExternalVariableStore'])], ExternalVariableEditor);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExternalVariableEditor;