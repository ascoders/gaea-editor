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
var typings = require("./to-template.type");
var EditorManager = require("../../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-modal');
var index_3 = require('nt-web-button');
var index_4 = require('nt-web-input');
require("./to-template.css");
var ToTemplate = function (_React$Component) {
    (0, _inherits3.default)(ToTemplate, _React$Component);

    function ToTemplate() {
        (0, _classCallCheck3.default)(this, ToTemplate);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ToTemplate.__proto__ || Object.getPrototypeOf(ToTemplate)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(ToTemplate, [{
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

            this.setState({
                show: false
            });
            var componentFullInfo = this.props.ViewportAction.getComponentFullInfoByMapUniqueKey(this.props.ViewportStore.currentEditComponentMapUniqueKey);
            componentFullInfo.componentInfo = this.props.ApplicationAction.cleanComponent(componentFullInfo.componentInfo);
            Object.keys(componentFullInfo.childs).forEach(function (childKey) {
                componentFullInfo.childs[childKey] = _this2.props.ApplicationAction.cleanComponent(componentFullInfo.childs[childKey]);
            });
            this.props.TabToolsComponentsComboAction.addCombo(this.state.templateName, componentFullInfo);
        }
    }, {
        key: "handleCancel",
        value: function handleCancel() {
            this.setState({
                show: false
            });
        }
    }, {
        key: "handleChangeTemplateName",
        value: function handleChangeTemplateName(value) {
            this.setState({
                templateName: value
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(index_3.Button, { className: "child-scale", onClick: this.handleShowModal }, React.createElement("i", { className: "fa fa-puzzle-piece" }), React.createElement(index_2.Modal, { title: "设为模板", show: this.state.show, onOk: this.handleOk.bind(this), onCancel: this.handleCancel.bind(this) }, React.createElement(index_4.Input, { value: this.state.templateName, label: "模板名称", onChange: this.handleChangeTemplateName })));
        }
    }]);
    return ToTemplate;
}(React.Component);
ToTemplate.defaultProps = new typings.Props();
ToTemplate.position = 'navbarRight';
__decorate([index_1.autoBindMethod], ToTemplate.prototype, "handleShowModal", null);
__decorate([index_1.autoBindMethod], ToTemplate.prototype, "handleOk", null);
__decorate([index_1.autoBindMethod], ToTemplate.prototype, "handleCancel", null);
__decorate([index_1.autoBindMethod], ToTemplate.prototype, "handleChangeTemplateName", null);
ToTemplate = __decorate([EditorManager.observer(['ApplicationStore', 'ViewportStore', 'ViewportAction', 'ApplicationAction', 'TabToolsComponentsComboAction'])], ToTemplate);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ToTemplate;