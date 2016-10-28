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
var typings = require("./edit-item.type");
var mobx_react_1 = require("mobx-react");
var text_component_1 = require("./edit-components/text/text.component");
var select_component_1 = require("./edit-components/select/select.component");
var switch_component_1 = require("./edit-components/switch/switch.component");
var array_component_1 = require("./edit-components/array/array.component");
var margin_padding_component_1 = require("./edit-components/margin-padding/margin-padding.component");
var number_component_1 = require("./edit-components/number/number.component");
var width_height_component_1 = require("./edit-components/width-height/width-height.component");
var layout_component_1 = require("./edit-components/layout/layout.component");
var overflow_component_1 = require("./edit-components/overflow/overflow.component");
var background_component_1 = require("./edit-components/background/background.component");
var font_component_1 = require("./edit-components/font/font.component");
var border_component_1 = require("./edit-components/border/border.component");
var instance_component_1 = require("./edit-components/instance/instance.component");
var position_component_1 = require("./edit-components/position/position.component");
var variable_component_1 = require("./edit-components/variable/variable.component");
var index_1 = require('nt-web-tooltip');
var EditBoxBasic = function (_React$Component) {
    (0, _inherits3.default)(EditBoxBasic, _React$Component);

    function EditBoxBasic() {
        (0, _classCallCheck3.default)(this, EditBoxBasic);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditBoxBasic.__proto__ || Object.getPrototypeOf(EditBoxBasic)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditBoxBasic, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            var _this2 = this;

            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
            this.componentInfo.props.gaeaVariables.forEach(function (variable) {
                if (variable.field === _this2.props.editOption.field) {
                    _this2.setState({
                        inVariable: true
                    });
                }
            });
        }
    }, {
        key: "handleChangeVariable",
        value: function handleChangeVariable(isIn) {
            this.setState({
                inVariable: isIn
            });
            if (!isIn) {
                this.props.viewport.removeVariable(this.props.viewport.currentEditComponentMapUniqueKey, this.props.editOption.field);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (!this.props.viewport.currentEditComponentMapUniqueKey) {
                return null;
            }
            var EditElement = null;
            var currentVariable = null;
            this.componentInfo.props.gaeaVariables.forEach(function (variable) {
                if (variable.field === _this3.props.editOption.field) {
                    currentVariable = JSON.parse(JSON.stringify(variable));
                }
            });
            switch (this.props.editOption.editor) {
                case 'text':
                    EditElement = React.createElement(text_component_1.default, { editOption: this.props.editOption });
                    break;
                case 'selector':
                    EditElement = React.createElement(select_component_1.default, { editOption: this.props.editOption });
                    break;
                case 'switch':
                    EditElement = React.createElement(switch_component_1.default, { editOption: this.props.editOption });
                    break;
                case 'array':
                    EditElement = React.createElement(array_component_1.default, { editOption: this.props.editOption });
                    break;
                case 'marginPadding':
                    EditElement = React.createElement(margin_padding_component_1.default, { editOption: this.props.editOption });
                    break;
                case 'number':
                    EditElement = React.createElement(number_component_1.default, { editOption: this.props.editOption });
                    break;
                case 'widthHeight':
                    EditElement = React.createElement(width_height_component_1.default, { editOption: this.props.editOption });
                    break;
                case 'layout':
                    EditElement = React.createElement(layout_component_1.default, { editOption: this.props.editOption });
                    break;
                case 'overflow':
                    EditElement = React.createElement(overflow_component_1.default, { editOption: this.props.editOption });
                    break;
                case 'background':
                    EditElement = React.createElement(background_component_1.default, { editOption: this.props.editOption });
                    break;
                case 'font':
                    EditElement = React.createElement(font_component_1.default, { editOption: this.props.editOption });
                    break;
                case 'border':
                    EditElement = React.createElement(border_component_1.default, { editOption: this.props.editOption });
                    break;
                case 'instance':
                    EditElement = React.createElement(instance_component_1.default, { editOption: this.props.editOption });
                    break;
                case 'position':
                    EditElement = React.createElement(position_component_1.default, { editOption: this.props.editOption });
                    break;
            }
            return React.createElement("div", { className: "edit-line-container" }, this.props.editOption.label !== '' && React.createElement("div", { className: "edit-line-label" }, this.props.editOption.label), this.props.editOption.canVariable && !this.state.inVariable && React.createElement("div", { className: "edit-line-variable-container" }, React.createElement(index_1.default, { title: "点击以使用变量" }, React.createElement("div", { className: "edit-line-enable-variable", onClick: this.handleChangeVariable.bind(this, true) }, React.createElement("i", { className: "fa fa-eercast" })))), this.props.editOption.canVariable && this.state.inVariable && React.createElement("div", { className: "edit-line-variable-container" }, React.createElement(index_1.default, { title: "点击以使用常量" }, React.createElement("div", { className: "edit-line-enable-variable active", onClick: this.handleChangeVariable.bind(this, false) }, React.createElement("i", { className: "fa fa-eercast" })))), !this.state.inVariable && React.createElement("div", { className: "edit-line-editor" }, EditElement), this.state.inVariable && React.createElement("div", { className: "edit-line-editor" }, React.createElement(variable_component_1.default, { variable: currentVariable, editOption: this.props.editOption })));
        }
    }]);
    return EditBoxBasic;
}(React.Component);
EditBoxBasic.defaultProps = new typings.Props();
EditBoxBasic = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], EditBoxBasic);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditBoxBasic;